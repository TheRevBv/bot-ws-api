import "dotenv/config";
import { adapterProvider } from "~/adapters";
import { MessageFacade } from "~/facades";
import { MessageService } from "~/services";
import { handleCtx, botCtx } from "~/types";

/**
 * Clase para manejar las rutas
 * @class Routes
 * @constructor handleCtx - Función para manejar el contexto
 * @constructor preffix - Prefijo para las rutas
 * @constructor facades - Instancia de la clase Facades
 */
export class Routes {
  handleCtx: handleCtx;
  preffix: string;
  facades: MessageFacade;

  /**
   * Constructor de la clase Routes
   * @param handleCtx Función que maneja el contexto
   * @param preffix Prefijo de las rutas
   * @param bot Instancia del bot de BuilderBot
   */
  constructor(handleCtx: handleCtx, preffix: string, bot: botCtx) {
    this.handleCtx = handleCtx;
    this.preffix = preffix;

    // Instanciamos MessageService con el bot
    const messageService = new MessageService(bot);

    // Creamos la instancia de MessageFacade pasando handleCtx y messageService
    this.facades = new MessageFacade(handleCtx, messageService);
  }

  /**
   * Registra la ruta para enviar mensajes
   * @method sendMessage
   * @returns {void}
   */
  sendMessage(): void {
    adapterProvider.server.post(
      `/${this.preffix}/send-message`,
      this.facades.sendMessageFacade.bind(this.facades)
    );
  }

  /**
   * Inicializa las rutas
   * @method init
   * @returns {void}
   */
  init(): void {
    this.sendMessage();
  }
}
