import "dotenv/config";
import { CoreClass, createBot, createFlow, MemoryDB } from "@bot-whatsapp/bot";
import database from "./database/index";
import provider from "./provider/index";
import flow from "./flow/index";
import { handleServices } from "./server/index";

/**
 * Tipos para los parámetros de la función handleServices
 */
type HandleCtx = (
  bot: Pick<CoreClass<any, any>["provider"], "sendMessage" | "vendor"> & {
    provider: CoreClass<any, any>["provider"];
    blacklist: any;
    dispatch: any;
  }
) => (req: any, res: any) => any;

/**
 * Funcion principal de la aplicación
 */
const main = async () => {
  // Inicializar server con provider
  // startServer(+process.env.PORT || 3002);

  // Inicializar el bot
  const { httpServer } = await createBot({
    flow: createFlow([]),
    database: database,
    provider: provider,
  });

  // Inicializar el bot
  httpServer(+process.env.PORT || 3002);

  // Manejar contexto
  handleServices();
};

main();
