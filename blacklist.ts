import { kv } from "./deno.ts";

export async function isBanned(userID: number): Promise<boolean> {
  const bannedUser = await kv.get(["blacklist", userID]);
  return bannedUser.value !== null;
}

export async function ban(userID: number): Promise<void> {
  await kv.set(["blacklist", userID], true);
}

export async function unban(userID: number): Promise<void> {
  await kv.delete(["blacklist", userID]);
}
