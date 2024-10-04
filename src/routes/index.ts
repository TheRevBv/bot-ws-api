import { adapterProvider } from "~/adapters";
import { handleSendMessage } from "~/services";

export const routes = () => {
  // Ruta para enviar mensajes
  adapterProvider.server.post("/send-message", async function (req, res) {
    await handleSendMessage(res, req);
  });
};
