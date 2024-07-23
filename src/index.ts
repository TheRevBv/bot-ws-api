import "dotenv/config";
import { createBot, createFlow, MemoryDB } from "@bot-whatsapp/bot";
import provider from "./provider";
import flow from "./flow";
import { startServer } from "./server";

/**
 * Funcion principal de la aplicación
 */
const main = async () => {
  // Inicializar server con provider
  startServer(+process.env.PORT || 3002);

  // Inicializar el bot
  await createBot({
    flow: createFlow([]),
    database: new MemoryDB(),
    provider: provider,
  });
};

main();
