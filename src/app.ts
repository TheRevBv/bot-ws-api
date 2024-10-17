import configs from "./config";
import { createBot } from "@builderbot/bot";
import { adapterDB, adapterFlow, adapterProvider } from "./adapters";
import { Routes } from "./routes";

const main = async () => {
  const { httpServer, handleCtx } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  httpServer(configs.PORT);

  const routes = new Routes(handleCtx, configs.API_PREFIX);

  routes.init();
};

main();
