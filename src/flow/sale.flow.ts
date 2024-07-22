import BotWhatsapp from "@bot-whatsapp/bot";
import pixcua from "@services/pixcua";
import idleFlow from "./idle.flow";
import pedidosFlow from "./pedidos.flow";

const enum ACTIONS {
  ORDER = "pedido",
  BILL = "factura",
}

/**
 * Un flujo conversacion que es por defecto cunado no se contiene palabras claves en otros flujos
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME).addAnswer(
  "Hola! Soy un bot de ventas, ¿En qué puedo ayudarte?",
  { capture: true },
  async (ctx, { state, fallBack, gotoFlow }) => {
    //Accion a tomar si contiene una palabra clave

    if (ctx.body.toLowerCase().includes(ACTIONS.ORDER)) {
      console.log(`[ACTION]:`, ctx.body);
      return gotoFlow(pedidosFlow);
    }

    if (ctx.body.toLowerCase().includes(ACTIONS.BILL)) {
      return gotoFlow(idleFlow); //TODO: Cambiar a facturaFlow
    }

    //Si no contiene una palabra clave, ademas de listar las opciones disponibles, se le pide al usuario que ingrese una opcion valida
    return fallBack(
      `Eyy!bro esto no es una opcion valida! ponte serio \n\nOpciones disponibles: \n- ${ACTIONS.ORDER} \n- ${ACTIONS.BILL}`
    );
  }
);
