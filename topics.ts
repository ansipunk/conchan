import { ADMIN_CHAT_ID } from "./constants.ts";
import { bot } from "./bot.ts";
import { kv } from "./deno.ts";

export async function getTopic(userID: number): Promise<number> {
  const topicInKV = await kv.get(["topics", userID]);
  if (topicInKV.value !== null) {
    return topicInKV.value as number;
  }

  const user = await bot.api.getChat(userID);
  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  const username = user.username || "";
  const name = `${firstName} ${lastName} ${username}`;

  const topic = await bot.api.createForumTopic(ADMIN_CHAT_ID, name);
  const topicID = topic.message_thread_id;
  await kv.set(["topics", userID], topicID);
  await kv.set(["users", topicID], userID);

  return topicID;
}

export async function getUser(topicID: number): Promise<number | undefined> {
  const userInKV = await kv.get(["users", topicID]);
  if (userInKV.value !== null) {
    return userInKV.value as number;
  }
}
