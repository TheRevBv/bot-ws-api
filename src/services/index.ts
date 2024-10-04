import { createBot, createFlow } from "@builderbot/bot";
import { adapterDB, adapterProvider } from "../adapters";
import { Request, Response } from "express";

export const initializeBot = async () => {
  const adapterFlow = createFlow([]);
  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  return { handleCtx, httpServer, bot: adapterProvider };
};

export const handleSendMessage = async (res: Response, req: Request) => {
  const { phoneNumber, message, urlMedia } = req.body;
  //   await sendMessage(number, message, urlMedia);
  await adapterProvider.sendMessage(phoneNumber, message, {
    media: urlMedia ?? null,
  });
  return res.end("Mensaje enviado");
};