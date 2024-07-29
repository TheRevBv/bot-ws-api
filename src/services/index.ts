import { inHandleCtx } from "@bot-whatsapp/provider-baileys";
import "dotenv/config";
import { Request, Response } from "express";

export const handleSendMessage = inHandleCtx(
  async (bot, req: Request, res: Response) => {
    try {
      const phonePrefix = process.env.PREX_PHONE_DEFAULT || "";
      const body = req.body;
      const phone = `${phonePrefix}${body.phone}`;
      const message = body.message;
      const imageUrl = body.imageUrl;

      const options = imageUrl ? { image: imageUrl } : {};
      await bot.sendMessage(phone, message, options);
      res.end(`Mensaje enviado a ${phone}`);
    } catch (error) {
      console.error(error);
      res.status(500).end("Error al enviar el mensaje");
    }
  }
);
