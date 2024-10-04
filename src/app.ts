import "dotenv/config";
import { initializeBot } from "./services";
import { routes } from "./routes";

const PORT = process.env.PORT ?? 3008;

const main = async () => {
  const { httpServer, handleCtx } = await initializeBot();
  routes();

  httpServer(+PORT);
};

main();
