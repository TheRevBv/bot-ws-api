import { setRoutes } from "../routes/index";
import provider from "../provider/index";

export const handleServices = () => {
  // Ruta para enviar mensajes
  setRoutes(provider.http.server);
};
