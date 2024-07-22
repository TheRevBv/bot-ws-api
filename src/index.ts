import "dotenv/config";
import {
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from "@bot-whatsapp/bot";
import provider from "./provider";
import database from "@database/index";
import flow from "./flow";
import { handleCtx } from "@bot-whatsapp/provider-baileys";

/**
 *
 */
const main = async () => {
  provider.initHttpServer(3002);

  provider.http.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const body = req.body;
      const message = body.message;
      const phoneNumber = body.phoneNumber;
      const mediaUrl = body.mediaUrl;
      console.log("url imagen", mediaUrl);
      await bot.sendMessage(phoneNumber, message, {
        media: mediaUrl,
      });
      res.end("Esto desde el server de polka");
    })
  );
  await createBot({
    flow: createFlow([flow]),
    database: new MemoryDB(),
    provider: provider,
  });
};

main();
