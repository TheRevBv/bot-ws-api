import { IRecordSet } from "mssql";
import GenericSQLService from "../generic";

export default class EmpresaService extends GenericSQLService<any> {
  constructor() {
    super("dbo", "Empresas");
  }

  public async getEmpresas(): Promise<IRecordSet<any>[]> {
    const empresas = await this.getAll();
    return empresas.recordsets as IRecordSet<any>[];
  }

  public async getEmpresaById(id: number): Promise<IRecordSet<any>> {
    const empresa = await this.getById(id);
    return empresa.recordset as IRecordSet<any>;
  }
}
