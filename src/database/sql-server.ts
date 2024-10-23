import { MemoryDB } from "@builderbot/bot";
import sql, { ConnectionPool, config as SqlConfig, IResult } from "mssql";
import type { SQLServerAdapterCredentials, HistoryRow } from "./types";

/**
 * Clase SQLServerAdapter que hereda de MemoryDB para manejar conexiones y operaciones con SQL Server.
 */
class SQLServerAdapter extends MemoryDB {
  private pool: ConnectionPool | null = null;
  private table: string;
  listHistory: any[] = [];

  /**
   * Constructor de SQLServerAdapter.
   * @param {SQLServerAdapterCredentials} credentials - Credenciales de conexión a SQL Server.
   * @param {string} table - Nombre de la tabla a manejar.
   */
  constructor(
    private credentials: SQLServerAdapterCredentials,
    table: string = "history"
  ) {
    super();
    this.table = table;
    this.init().catch((e) => {
      throw new Error(e?.message);
    });
  }

  /**
   * Inicializa la conexión con SQL Server y verifica la existencia de la tabla.
   */
  private async init(): Promise<void> {
    try {
      const config: SqlConfig = {
        user: this.credentials.user,
        password: this.credentials.password,
        server: this.credentials.server,
        database: this.credentials.database,
        port: this.credentials.port || 1433,
        options: {
          encrypt: this.credentials.options?.encrypt || false,
          trustServerCertificate:
            this.credentials.options?.trustServerCertificate || false,
        },
      };

      this.pool = await sql.connect(config);
      console.log("Conexión exitosa a SQL Server");
      await this.checkTableExists();
    } catch (error) {
      console.error("Error al conectar a SQL Server:", error);
      throw error;
    }
  }

  /**
   * Verifica si la tabla especificada existe, y la crea si no existe.
   */
  private async checkTableExists(): Promise<void> {
    if (!this.pool) throw new Error("La conexión no está establecida.");

    const query = `
          IF NOT EXISTS (
              SELECT * FROM INFORMATION_SCHEMA.TABLES 
              WHERE TABLE_NAME = '${this.table}'
          )
          CREATE TABLE ${this.table} (
              id INT IDENTITY(1,1) PRIMARY KEY,
              ref NVARCHAR(255) DEFAULT NULL,
              keyword NVARCHAR(255) NULL,
              answer NVARCHAR(MAX) NULL,
              refSerialize NVARCHAR(255) NULL,
              phone NVARCHAR(255) NOT NULL,
              options NVARCHAR(MAX) NULL,
              created_at DATETIME DEFAULT GETDATE()
          )
      `;

    try {
      await this.pool.request().query(query);
      console.log(`Tabla '${this.table}' verificada o creada exitosamente.`);
    } catch (error) {
      console.error("Error al verificar o crear la tabla:", error);
      throw error;
    }
  }

  /**
   * Obtiene la entrada previa basada en el número de teléfono.
   * @param {string} from - El número de teléfono desde el cual buscar la entrada previa.
   * @returns {Promise<HistoryRow>} - La entrada previa encontrada.
   */
  public async getPrevByNumber(from: string): Promise<HistoryRow> {
    if (!this.pool) throw new Error("La conexión no está establecida.");

    console.log(`Valor recibido para 'from' (phone): ${from}`); // Log del valor recibido

    const query = `
          SELECT TOP 1 * FROM ${this.table}
          WHERE phone = @from
          ORDER BY id DESC
      `;

    try {
      const result: IResult<HistoryRow> = await this.pool
        .request()
        .input("from", sql.VarChar(255), from)
        .query(query);

      if (result.recordset.length > 0) {
        const row = result.recordset[0];
        // Parsear las opciones si están en formato JSON
        row.options = row.options ? JSON.parse(row.options) : null;
        return row;
      } else {
        // Retornar un objeto vacío o manejar según tu lógica
        return {} as HistoryRow;
      }
    } catch (error) {
      console.error("Error al obtener la entrada previa:", error);
      throw error;
    }
  }

  /**
   * Guarda una nueva entrada en la tabla.
   * @param {any} ctx - Datos a guardar.
   */
  public async save(ctx: {
    ref: string;
    keyword: string;
    answer: any;
    refSerialize: string;
    from: string;
    options: any;
  }): Promise<void> {
    if (!this.pool) throw new Error("La conexión no está establecida.");

    const sqlQuery = `
          INSERT INTO ${this.table} (ref, keyword, answer, refSerialize, phone, options)
          VALUES (@ref, @keyword, @answer, @refSerialize, @from, @options)
      `;

    try {
      await this.pool
        .request()
        .input("ref", sql.NVarChar(255), ctx.ref)
        .input("keyword", sql.NVarChar(255), ctx.keyword)
        .input("answer", sql.NVarChar(sql.MAX), JSON.stringify(ctx.answer))
        .input("refSerialize", sql.NVarChar(255), ctx.refSerialize)
        .input("from", sql.NVarChar(255), ctx.from)
        .input("options", sql.NVarChar(sql.MAX), JSON.stringify(ctx.options))
        .query(sqlQuery);
      console.log("Datos guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      throw error;
    }
  }

  /**
   * Crea la tabla especificada en la base de datos.
   * @returns {Promise<boolean>} - Siempre retorna true si la operación es exitosa.
   */
  public async createTable(): Promise<boolean> {
    if (!this.pool) throw new Error("La conexión no está establecida.");

    const query = `
          CREATE TABLE ${this.table} (
              id INT IDENTITY(1,1) PRIMARY KEY,
              ref NVARCHAR(255),
              keyword NVARCHAR(255),
              answer NVARCHAR(MAX),
              refSerialize NVARCHAR(255),
              phone NVARCHAR(255),
              options NVARCHAR(MAX),
              created_at DATETIME DEFAULT GETDATE()
          )
      `;

    try {
      await this.pool.request().query(query);
      console.log(`Tabla '${this.table}' creada exitosamente.`);
      return true;
    } catch (error) {
      console.error("Error al crear la tabla:", error);
      throw error;
    }
  }

  /**
   * Cierra la conexión con SQL Server.
   */
  public async closeConnection(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      console.log("Conexión a SQL Server cerrada.");
    }
  }
}

export { SQLServerAdapter };
