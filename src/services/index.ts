import { Request, Response } from "express";
import { botCtx } from "~/types";

/**
 * Clase para manejar el envío de mensajes utilizando el bot de BuilderBot
 */
export class MessageService {
  private bot: botCtx;

  /**
   * Constructor para inicializar la clase con el bot.
   * @param bot Instancia del bot de BuilderBot
   */
  constructor(bot: botCtx) {
    this.bot = bot;
  }

  /**
   * Método para manejar el envío de mensajes.
   * @param req Petición de tipo Express
   * @param res Respuesta de tipo Express
   * @returns Respuesta con el mensaje de confirmación
   */
  public async sendMessage(req: Request, res: Response): Promise<void> {
    const { phoneNumber, message, urlMedia } = req.body;

    try {
      // Envía el mensaje a través del bot
      await this.bot.sendMessage(phoneNumber, message, {
        media: urlMedia ?? null,
      });

      // Respuesta en caso de éxito
      res.end("Mensaje correctamente enviado a " + phoneNumber);
    } catch (error) {
      // Manejo de errores
      res.status(500).send("Error al enviar el mensaje");
    }
  }
}
