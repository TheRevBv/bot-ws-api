import configs from "~/config";
import { createFlow, createProvider } from "@builderbot/bot";
import Database from "~/database";
import { Provider } from "~/provider";
import { fullSamplesFlow, welcomeFlow } from "~/flows";

const adapterDB = new Database({
  host: configs.MYSQL_DB_HOST,
  database: configs.MYSQL_DB_NAME,
  user: configs.MYSQL_DB_USER,
  password: configs.MYSQL_DB_PASSWORD,
  port: Number(configs.MYSQL_DB_PORT),
});

const adapterProvider = createProvider(Provider);

const adapterFlow = createFlow([welcomeFlow, fullSamplesFlow]);

export { adapterProvider, adapterDB, adapterFlow };
