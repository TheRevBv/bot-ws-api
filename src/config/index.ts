import { createBot } from "@builderbot/bot";
import { adapterDB, adapterProvider, adapterFlow } from "../adapters";

export const initializeBot = async () => {
  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  return { handleCtx, httpServer, bot: adapterProvider };
};
