import {
  DynamicBlacklist,
  DispatchFn,
  BotStateStandAlone,
  BotStateGlobal,
} from "@builderbot/bot/dist/types";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { VenomProvider } from "@builderbot/provider-venom";
import { WPPConnectProvider } from "@builderbot/provider-wppconnect";
import { IncomingMessage, ServerResponse } from "http";
// import { Response } from "express";
// import * as polka from "polka";

export type botCtx = Pick<
  BaileysProvider | VenomProvider | WPPConnectProvider,
  "sendMessage" | "vendor"
> & {
  provider: BaileysProvider | VenomProvider | WPPConnectProvider;
  blacklist: DynamicBlacklist;
  dispatch: DispatchFn;
  state: (number: string) => BotStateStandAlone;
  globalState: () => BotStateGlobal;
};

export interface PolkaRequest extends IncomingMessage {
  body: {
    number?: string;
    urlMedia?: string;
    message?: string;
  };
}

export type PolkaResponse = ServerResponse;

export type handleCtx = (
  ctxPolka: (bot: botCtx, req: PolkaRequest, res: PolkaResponse) => Promise<any>
) => (...args: any[]) => any;
