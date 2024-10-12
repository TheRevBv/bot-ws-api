import { Request, Response } from "express";
import { botCtx } from "~/types";

/**
 * Clase para manejar el envío de mensajes utilizando el bot de BuilderBot
 */
export class MessageService {
  /**
   * Método para manejar el envío de mensajes.
   * @param req Petición de tipo Express
   * @param res Respuesta de tipo Express
   * @returns Respuesta con el mensaje de confirmación
   */
  public async sendMessage(
    bot: botCtx,
    req: Request,
    res: Response
  ): Promise<void> {
    const { phoneNumber, message, urlMedia } = req.body;

    try {
      // Envía el mensaje a través del bot
      await bot.sendMessage(phoneNumber, message, {
        media: urlMedia ?? null,
      });

      // Respuesta en caso de éxito
      res.end("Mensaje correctamente enviado a " + phoneNumber);
    } catch (error) {
      // Manejo de errores
      console.error("Error al enviar el mensaje", error);
      res.status(500).send("Error al enviar el mensaje");
    }
  }
}
