import polka from "polka";
import { handleSendMessage } from "../services/index";

export const setRoutes = (server: polka.Polka) => {
  // Ruta para enviar mensajes
  server.post("/send-message", handleSendMessage);
};
