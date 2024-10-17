import { addKeyword, utils } from "@builderbot/bot";
import { IProvider } from "~/provider";
import Database from "~/database";
import { join } from "path";

const fullSamplesFlow = addKeyword<IProvider, Database>([
  "samples",
  utils.setEvent("SAMPLES"),
])
  .addAnswer(`💪 I'll send you a lot files...`)
  .addAnswer(`Send image from Local`, {
    media: join(process.cwd(), "assets", "sample.png"),
  })
  .addAnswer(`Send video from URL`, {
    media:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJ0ZGdjd2syeXAwMjQ4aWdkcW04OWlqcXI3Ynh1ODkwZ25zZWZ1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LCohAb657pSdHv0Q5h/giphy.mp4",
  })
  .addAnswer(`Send audio from URL`, {
    media: "https://cdn.freesound.org/previews/728/728142_11861866-lq.mp3",
  })
  .addAnswer(`Send file from URL`, {
    media:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  });

const welcomeFlow = addKeyword<IProvider, Database>(["hi", "hello", "hola"])
  .addAnswer(
    `🙌 Hola Bienvenido a este *Chatbot* de Refresquera Internacional SA de CV`
  )
  .addAnswer(
    [
      "De momento no tenemos servicio de respuesta",
      "Para dudas o sugerencias puede llamar al 👉 *800-7070242* para poder atenderle",
    ].join("\n"),
    { delay: 800, capture: false }
  );

export { welcomeFlow, fullSamplesFlow };
