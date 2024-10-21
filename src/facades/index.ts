import { MessageService } from "~/services";
import { botCtx, PolkaRequest } from "~/types";

export class MessageFacade {
  public _messageService: MessageService;

  constructor() {
    this._messageService = new MessageService();
  }

  /**
   * Envia un mensaje a través de la API de BuilderBot
   */
  public async sendMessageFacade(
    bot: botCtx,
    req: PolkaRequest,
    res
  ): Promise<any> {
    try {
      // return this._messageService.sendMessage(bot, req, res);
      return this._messageService.sendMessage(bot, req, res);
    } catch (error) {
      console.error("Hubo un error en la paqueteria", error);
      return res.end("Huboe un error al hacer el envio", error);
    }
  }
}

export default MessageFacade;
