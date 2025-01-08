import { Bot, Context } from "./deps.deno.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command("start", (ctx: Context) => {
  ctx.reply("Welcome! Up and running.");
});

bot.command("ping", (ctx: Context) => {
  ctx.reply(`Pong! ${new Date()} ${Date.now()}`);
});
