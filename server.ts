import { bot } from "./bot.ts";
import { webhookCallback } from "./deps.deno.ts";
import { WEBHOOK_DOMAIN, WEBHOOK_PATH, WEBHOOK_SECRET } from "./constants.ts";

async function startWebhook() {
  const handleUpdate = webhookCallback(bot, "std/http", {
    secretToken: WEBHOOK_SECRET,
  });

  await bot.api.setWebhook(WEBHOOK_DOMAIN + WEBHOOK_PATH, {
    secret_token: WEBHOOK_SECRET,
  });

  Deno.serve(async (req) => {
    if (req.method == "POST") {
      const url = new URL(req.url);
      if (url.pathname == WEBHOOK_PATH) {
        try {
          return await handleUpdate(req);
        } catch (err) {
          console.error(err);
        }
      }
    }
    return new Response();
  });
}

if (WEBHOOK_DOMAIN === "") {
  await bot.api.deleteWebhook({ drop_pending_updates: false });
  await bot.start();
} else {
  await startWebhook();
}
