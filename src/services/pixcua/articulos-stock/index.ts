import { IArticulosStock } from "@models/IArticulosStock";
import GenericSQLService from "../generic";
import sql from "mssql";

export default class ArticulosStockService extends GenericSQLService<IArticulosStock> {
  constructor() {
    super("Inventory", "ArticulosStock");
  }

  public getArticulosStockList = async () => {
    const params = Array<{ name: string; type: any; value: any }>();
    params.push({ name: "IdUsuario", type: sql.Int, value: 1 });
    params.push({ name: "IdSucursal", type: sql.Int, value: 1 });

    const data = await this.getAllFxLST(params);

    console.log(`[1 - ARTICULOS STOCK]:`, data.recordset);
    return data.recordset;
  };

  public getArticulosStockById = async (IdArticulo: number) => {
    const params = Array<{ name: string; type: any; value: any }>();
    params.push({ name: "IdArticulo", type: sql.Int, value: IdArticulo });

    const data = await this.getAllFxSEL(params);
    return data.recordset;
  };
}
