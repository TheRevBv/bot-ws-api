import { adapterProvider } from "~/adapters";
import { MessageFacade } from "~/facades";
// import { handleCtx } from "~/types";

/**
 * Clase para manejar las rutas
 * @class Routes
 * @constructor handleCtx - Función para manejar el contexto
 * @constructor preffix - Prefijo para las rutas
 * @constructor facades - Instancia de la clase Facades
 */
export class Routes {
  handleCtx: any;
  preffix: string;
  facades: MessageFacade;

  /**
   * Constructor de la clase Routes
   * @param handleCtx Función que maneja el contexto
   * @param preffix Prefijo de las rutas
   */
  constructor(handleCtx: any, preffix: string) {
    this.handleCtx = handleCtx;
    this.preffix = preffix;
    this.facades = new MessageFacade();
  }

  /**
   * Registra la ruta para enviar mensajes
   * @method sendMessage
   * @returns {}
   */
  sendMessage() {
    try {
      adapterProvider.server.post(
        `/${this.preffix}/send-message`,
        this.handleCtx(async (bot, req, res) => {
          return await this.facades.sendMessageFacade(bot, req, res);
          // const { number, message, urlMedia } = req.body;
          // console.log(req.body);
          // await bot.sendMessage(number, message, { media: urlMedia ?? null });
          // return res.end("sended");
        })
      );
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /**
   * Ruta para saber si el servidor esta en ejecucion
   */
  showRunningInfo(): void {
    adapterProvider.server.get(`/${this.preffix}/status`, (req, res) => {
      console.warn("Sistema en ejecución");
      try {
        // Establece el código de estado HTTP
        res.statusCode = 200;

        // Establece el encabezado Content-Type para JSON
        res.setHeader("Content-Type", "application/json");

        // Envía la respuesta JSON
        res.end(
          JSON.stringify({
            status: "En ejecución",
            uptime: process.uptime(),
          })
        );
      } catch (e) {
        console.error(
          "Ha ocurrido un error al intentar procesar la información del servicio: ",
          e
        );

        // Establece el código de estado HTTP para error
        res.statusCode = 500;

        // Establece el encabezado Content-Type para texto plano
        res.setHeader("Content-Type", "text/plain");

        // Envía el mensaje de error
        res.end(
          "Ha ocurrido un error al intentar procesar la información del servicio"
        );
      }
    });
  }

  /**
   * Inicializa las rutas
   * @method init
   * @returns {void}
   */
  init(): void {
    try {
      this.sendMessage();

      this.showRunningInfo();
    } catch (error) {
      console.error("No se pudo procesar la ruta", error);
    }
  }
}
