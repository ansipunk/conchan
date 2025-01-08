export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "token";
export const WEBHOOK_DOMAIN = Deno.env.get("WEBHOOK_DOMAIN") || "";
export const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") || "secret";
export const WEBHOOK_PATH = Deno.env.get("WEBHOOK_PATH") || "/bot";
export const ADMIN_CHAT_ID = parseInt(Deno.env.get("ADMIN_CHAT_ID") || "0");
export const WELCOME_MESSAGE = Deno.env.get("WELCOME_MESSAGE") ||
  "Your messages will be forwarded to the administrator.";
export const BAN_MESSAGE = Deno.env.get("BAN_MESSAGE") ||
  "The user has been banned. Send /unban to undo.";
export const UNBAN_MESSAGE = Deno.env.get("UNBAN_MESSAGE") ||
  "The user has been unbanned. Send /ban to undo.";
export const BANNED_MESSAGE = Deno.env.get("BANNED_MESSAGE") ||
  "You have been banned. Administrator will no longer receive your messages.";
export const UNBANNED_MESSAGE = Deno.env.get("UNBANNED_MESSAGE") ||
  "You have been unbanned. Your new messages will be forwarded to the administrator.";
