import { MessageService } from "~/services";
import { Request, Response } from "express";
import { botCtx, handleCtx } from "~/types";

export class MessageFacade {
  private handleCtx: handleCtx;
  private messageService: MessageService;

  constructor(handleCtx: handleCtx, messageService: MessageService) {
    this.handleCtx = handleCtx;
    this.messageService = messageService;
  }

  /**
   * Envia un mensaje a través de la API de BuilderBot
   */
  public async sendMessageFacade(): Promise<any> {
    this.handleCtx(async (_bot: botCtx, req: Request, res: Response) => {
      // Usa el servicio para enviar el mensaje
      await this.messageService.sendMessage(req, res);
    });
  }
}

export default MessageFacade;
