import "dotenv/config";
import { createFlow, createProvider } from "@builderbot/bot";
import Database from "~/database";
import Provider from "~/provider";

const adapterProvider = createProvider(Provider);

const adapterDB = new Database({
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  port: Number(process.env.MYSQL_DB_PORT) || 3306, // Default port 3306
});

const adapterFlow = createFlow([]);

export { adapterProvider, adapterDB, adapterFlow };
