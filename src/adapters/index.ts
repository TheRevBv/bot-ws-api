import configs from "~/config";
import { createFlow, createProvider } from "@builderbot/bot";
import Database from "~/database";
import { Provider } from "~/provider";
import { fullSamplesFlow, welcomeFlow } from "~/flows";

const adapterDB = new Database({
  server: configs.DB_HOST,
  database: configs.DB_NAME,
  user: configs.DB_USER,
  password: configs.DB_PASSWORD,
  options: {
    encrypt: configs.DB_ENCRYPT,
    trustServerCertificate: configs.DB_TRUST_SERVER_CERTIFICATE,
  },
  // port: Number(configs.DB_PORT),
});

const adapterProvider = createProvider(Provider);

const adapterFlow = createFlow([welcomeFlow, fullSamplesFlow]);

export { adapterProvider, adapterDB, adapterFlow };
