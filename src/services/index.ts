import configs from "~/config";

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
  public async sendMessage(bot: any, req: any, res: any): Promise<any> {
    let { number } = req.body;
    const { message, urlMedia } = req.body;

    try {
      if (number) {
        number = `${configs.PREX_PHONE_DEFAULT}${number}`;
      }
      console.log("mi num", number);
      // Envía el mensaje a través del bot
      await bot.sendMessage(number, message, {
        media: urlMedia ?? null,
      });

      // Respuesta en caso de éxito
      return res.end("Mensaje correctamente enviado a " + number);
    } catch (error) {
      // Manejo de errores
      console.error("Error al enviar el mensaje", error);
      return res.end("Error al enviar el mensaje");
    }
  }
}
