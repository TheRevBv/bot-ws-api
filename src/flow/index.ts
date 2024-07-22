import {
  addKeyword,
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from "@bot-whatsapp/bot";

const flowBienvenida = addKeyword("hola").addAnswer(
  "Hola, ¿en qué puedo ayudarte?"
);

export default flowBienvenida;
