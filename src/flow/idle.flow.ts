import { addKeyword } from "bot-ts-demo";
import saleFlow from "./sale.flow";

export default addKeyword("hola").addAnswer(
  "Debes de responder antes de que transcurran 2 segundos (2000)",
  { capture: true, idle: 5000 },
  async (ctx, { flowDynamic, gotoFlow }) => {
    const a = ctx as any;
    if (a?.idleFallBack) {
      return gotoFlow(saleFlow);
    }

    await flowDynamic("Gracias por tu respuesta");
  }
);
