import BotWhatsapp from "@bot-whatsapp/bot";
import pixcua from "@services/pixcua";

export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  //Enviar el lista de productos
  .addAction(async (ctx, { flowDynamic, state }) => {
    console.log("Inicio de la accion de productos");
    await flowDynamic(
      `Claro que si ${ctx.pushName}. Aqui tienes el lista de productos que tenemos disponibles:`
    );

    const articulosStockSvc = new pixcua.articulosStock();
    const articulosStock = await articulosStockSvc.getArticulosStockList();

    console.log(`[ARTICULOS STOCK]:`, articulosStock);

    //Remapea el listado de productos, esto los manda en varios mensajes
    const mapeoArticulosStock = articulosStock.map((articulo) => ({
      body: `Nombre: ${articulo.Descripción} \nCodigo: ${articulo.Código} \nUnidad: ${articulo.Unidad} \n`,
    }));

    //Convertir el listado de productos en un mensaje
    //Enviar el mensaje
    let mensaje = "";
    mapeoArticulosStock.forEach((articulo) => {
      mensaje += articulo.body;
    });

    console.log(`[MAPEO ARTICULOS STOCK]:`, mensaje);

    //Envia el listado de productos
    await flowDynamic(mensaje);
  });

/*
  .addAction(async (ctx, { flowDynamic, state }) => {
    try {
      console.log("Inicio de la accion de productos");
      // const articulosStockSvc = new pixcua.articulosStock();
      // const articulosStock = await articulosStockSvc.getArticulosStockList();

      // console.log(`[ARTICULOS STOCK]:`, articulosStock);

      // //Asigna el listado de productos a la variable global
      // const mapeoArticulosStock = articulosStock.map((articulo) => ({
      //   body: `Nombre: ${articulo.descripcion} \nCodigo: ${articulo.codigo} \nUnidad: ${articulo.unidad} \n`,
      // }));

      // await flowDynamic(mapeoArticulosStock);
    } catch (err) {
      console.log(`[ERROR]:`, err);
    }
  });
  */
