import { setRoutes } from "../routes";
import provider from "../provider";

export const startServer = (port: number) => {
  provider.initHttpServer(port);

  // Ruta para enviar mensajes
  setRoutes(provider.http.server);
};
