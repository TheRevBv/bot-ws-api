import { MessageService } from "~/services";

export class MessageFacade {
  public _messageService: MessageService;

  constructor() {
    this._messageService = new MessageService();
  }

  /**
   * Envia un mensaje a través de la API de BuilderBot
   */
  public async sendMessageFacade(bot, req, res): Promise<any> {
    try {
      // const { number, message, urlMedia } = req.body;
      // console.log(req.body);
      // await bot.sendMessage(number, message, { media: urlMedia ?? null });
      // return res.end("sended");
      return this._messageService.sendMessage(bot, req, res);
    } catch (error) {
      console.error("Hubo un error en la paqueteria", error);
      return res.end("Huboe un error al hacer el envio", error);
    }
  }
}

export default MessageFacade;
