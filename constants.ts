export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "token";
export const WEBHOOK_DOMAIN = Deno.env.get("WEBHOOK_DOMAIN") || "";
export const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") || "secret";
export const WEBHOOK_PATH = Deno.env.get("WEBHOOK_PATH") || "/bot";
export const ADMIN_CHAT_ID = Deno.env.get("ADMIN_CHAT_ID") || 0;
