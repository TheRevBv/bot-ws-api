import "dotenv/config";
import { initializeBot } from "./config";
import { Routes } from "./routes";

const PORT = process.env.PORT ?? 3008;
const preffix = process.env.PREFFIX ?? "api";

const main = async () => {
  const { httpServer, handleCtx } = await initializeBot();
  const routes = new Routes(handleCtx, preffix);
  routes.init();

  httpServer(+PORT);
};

main();
