import {
  DynamicBlacklist,
  DispatchFn,
  BotStateStandAlone,
  BotStateGlobal,
} from "@builderbot/bot/dist/types";
import { BaileysProvider } from "@builderbot/provider-baileys";

export type botCtx = Pick<BaileysProvider, "sendMessage" | "vendor"> & {
  provider: BaileysProvider;
  blacklist: DynamicBlacklist;
  dispatch: DispatchFn;
  state: (number: string) => BotStateStandAlone;
  globalState: () => BotStateGlobal;
};

export type handleCtx = (
  ctxPolka: (bot: botCtx, req: any, res: any) => Promise<void>
) => (...args: any[]) => any;
