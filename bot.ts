import {
  ADMIN_CHAT_ID,
  BAN_MESSAGE,
  BANNED_MESSAGE,
  BOT_TOKEN,
  UNBAN_MESSAGE,
  UNBANNED_MESSAGE,
  WELCOME_MESSAGE,
} from "./constants.ts";
import { Bot, Context } from "./deps.deno.ts";
import { getTopic, getUser } from "./topics.ts";
import { ban, isBanned, unban } from "./blacklist.ts";
import { getMailingTopic, getUsers } from "./mailing.ts";

export const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx: Context) => {
  const message = ctx.message;
  if (message === undefined || message.chat.type !== "private") return;

  ctx.reply(WELCOME_MESSAGE);
});

bot.command("ban", async (ctx: Context) => {
  const message = ctx.message;
  if (message === undefined) return;
  if (message.chat.id !== ADMIN_CHAT_ID) return;

  const topicID = message.message_thread_id;
  if (topicID === undefined) return;

  const userID = await getUser(topicID);
  if (userID === undefined) return;

  await ban(userID);
  await bot.api.sendMessage(userID, BANNED_MESSAGE);

  await ctx.reply(BAN_MESSAGE, { message_thread_id: topicID });
});

bot.command("unban", async (ctx: Context) => {
  const message = ctx.message;
  if (message === undefined) return;
  if (message.chat.id !== ADMIN_CHAT_ID) return;

  const topicID = message.message_thread_id;
  if (topicID === undefined) return;

  const userID = await getUser(topicID);
  if (userID === undefined) return;

  await unban(userID);
  await bot.api.sendMessage(userID, UNBANNED_MESSAGE);

  await ctx.reply(UNBAN_MESSAGE, { message_thread_id: topicID });
});

bot.on("message", async (ctx: Context) => {
  const message = ctx.message;
  if (message === undefined) return;

  if (message.chat.id === ADMIN_CHAT_ID) {
    const topicID = message.message_thread_id;
    if (topicID === undefined) return;

    const mailingTopic = await getMailingTopic();

    if (topicID === mailingTopic) {
      for await (const user of getUsers()) {
        await ctx.copyMessage(user);
      }
    } else {
      const userID = await getUser(topicID);
      if (userID === undefined) return;

      await ctx.copyMessage(userID);
    }
  } else if (message.chat.type === "private") {
    const userID = message.chat.id;
    if (await isBanned(userID)) return;

    const topicID = await getTopic(userID);
    await ctx.copyMessage(ADMIN_CHAT_ID, { message_thread_id: topicID });
  }
});
