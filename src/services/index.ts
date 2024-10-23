import configs from "~/config";
import { join } from "path";
import { botCtx, PolkaRequest, PolkaResponse } from "~/types";
import { normalizeMediaUrl } from "~/utils";
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
    req: PolkaRequest,
    res: PolkaResponse
  ): Promise<any> {
    let { number, urlMedia } = req.body;
    const { message } = req.body;

    try {
      if (number) {
        number = `${configs.PREX_PHONE_DEFAULT}${number}`;
      }
      console.log("mi num", number);

      const baseMediaUrl = configs.FILE_SERVER_PATH;

      urlMedia = normalizeMediaUrl(urlMedia, baseMediaUrl);

      console.info(urlMedia);
      // Envía el mensaje a través del bot
      await bot.sendMessage(number, message, {
        media: urlMedia ?? null,
      });

      // Configura el encabezado de la respuesta a JSON
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          status: res.statusCode,
          message: `Se ha enviado correctamente el mensaje al numero ${number}`,
          uptime: process.uptime(),
        })
      );
    } catch (error) {
      // Manejo de errores
      console.error("Error al enviar el mensaje", error);
      res.setHeader("Content-Type", "application/json");
      return res.end(
        JSON.stringify({
          status: res.statusCode,
          message: `Ha ocurrido un error al procesar su solicitud envio de mensaje al numero ${number}`,
          error: error.message,
          uptime: process.uptime(),
        })
      );
    }
  }
}
