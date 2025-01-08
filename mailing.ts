import { ADMIN_CHAT_ID } from "./constants.ts";
import { kv } from "./deno.ts";
import { bot } from "./bot.ts";

export async function* getUsers(): AsyncGenerator<number, void, void> {
  const users = kv.list({ prefix: ["users"] });
  for await (const user of users) {
    yield user.value as number;
  }
}

export async function getMailingTopic(): Promise<number> {
  const topicInKV = await kv.get(["mailing"]);
  if (topicInKV.value !== null) return topicInKV.value as number;

  const topic = await bot.api.createForumTopic(ADMIN_CHAT_ID, "Mailing list");
  const topicID = topic.message_thread_id;
  await kv.set(["mailing"], topicID);
  return topicID;
}
