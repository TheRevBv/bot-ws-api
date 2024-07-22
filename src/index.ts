import "dotenv/config";
import BotWhatsapp from "@bot-whatsapp/bot";
import database from "./database";
import provider from "./provider";
import flow from "./flow";
import { initServer } from "@services/http";

/**
 * Funcion principal del bot
 */
const main = async () => {

  console.clear();

  const botInstance = await BotWhatsapp.createBot({
    database,
    provider,
    flow,
  });

  initServer(botInstance);
};

main();
