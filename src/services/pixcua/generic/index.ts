import sql, { IResult, config as SQLConfig, ConnectionPool } from "mssql";
// import { Request } from "mssql";

export interface DBConfig extends SQLConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    enableArithAbort: boolean;
    trustServerCertificate: boolean;
  };
}

export default class GenericSQLService<T> {
  private poolPromise: Promise<ConnectionPool> | null = null;
  private config: DBConfig;
  private tableName: string;
  private schema: string;

  constructor(schema: string, tableName: string) {
    this.tableName = tableName;
    this.schema = schema;
    this.config = {
      user: process.env.EXTERNAL_DB_USER!,
      password: process.env.EXTERNAL_DB_PASSWORD!,
      server: process.env.EXTERNAL_DB_SERVER!,
      database: process.env.EXTERNAL_DB_DATABASE!,
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };
    this.poolPromise = this.connect();
  }

  private async connect(): Promise<ConnectionPool> {
    if (!this.poolPromise) {
      this.poolPromise = sql.connect(this.config);
    }
    return this.poolPromise;
  }

  private async query(
    query: string,
    parameters: any[] = [],
    transaction?: sql.Transaction
  ): Promise<IResult<T>> {
    const pool = await this.connect();
    let request: sql.Request;
    request = transaction
      ? new sql.Request(transaction)
      : new sql.Request(pool);

    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    try {
      return await request.query<T>(query);
    } catch (err) {
      console.error("Error ejecutando consulta:", err);
      throw err;
    }
  }

  public async executeProcedure(
    procedureName: string,
    parameters: any[] = [],
    transaction?: sql.Transaction
  ): Promise<IResult<T>> {
    const pool = await this.connect();
    let request: sql.Request;
    request = transaction
      ? new sql.Request(transaction)
      : new sql.Request(pool);

    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    try {
      return await request.execute<T>(procedureName);
    } catch (err) {
      console.error("Error ejecutando procedimiento:", err);
      throw err;
    }
  }

  public async executeProcedureQuery(
    query: string,
    transaction?: sql.Transaction
  ): Promise<IResult<T>> {
    const pool = await this.connect();
    let request: sql.Request;
    request = transaction
      ? new sql.Request(transaction)
      : new sql.Request(pool);
    try {
      return await request.execute<T>(query);
    } catch (err) {
      console.error("Error ejecutando procedimiento:", err);
      throw err;
    }
  }

  public async startTransaction(): Promise<sql.Transaction> {
    const pool = await this.connect();
    const transaction = new sql.Transaction(pool);
    const trans = await transaction.begin();
    return trans;
  }

  public async commitTransaction(transaction: sql.Transaction) {
    await transaction.commit();
  }

  public async rollbackTransaction(transaction: sql.Transaction) {
    await transaction.rollback();
  }

  public async getByQuery(query: string): Promise<IResult<T>> {
    return this.query(query);
  }

  public async getAllFxLST(
    parameters: any[] = [],
    transaction?: sql.Transaction
  ): Promise<IResult<T>> {
    const pool = await this.connect();
    let request = transaction
      ? new sql.Request(transaction)
      : new sql.Request(pool);

    // Asegúrate de añadir los parámetros correctamente
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Asegúrate de que la consulta utiliza parámetros con nombre y no concatenación de strings
    let query = `SELECT TOP 10 * FROM ${this.schema}.fx${this.tableName}LST(`;
    const paramNames = parameters.map((param) => `@${param.name}`).join(", ");
    query += paramNames + ")";

    try {
      return await request.query<T>(query);
    } catch (err) {
      console.error("Error ejecutando consulta:", err);
      throw err;
    }
  }

  public async getAllFxSEL(
    parameters: any[] = [],
    transaction?: sql.Transaction
  ): Promise<IResult<T>> {
    const pool = await this.connect();
    let request = transaction
      ? new sql.Request(transaction)
      : new sql.Request(pool);

    // Asegúrate de añadir los parámetros correctamente
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Asegúrate de que la consulta utiliza parámetros con nombre y no concatenación de strings
    let query = `SELECT * FROM ${this.schema}.fx${this.tableName}SEL(`;
    const paramNames = parameters.map((param) => `@${param.name}`).join(", ");
    query += paramNames + ")";

    try {
      return await request.query<T>(query);
    } catch (err) {
      console.error("Error ejecutando consulta:", err);
      throw err;
    }
  }

  public async getAll(): Promise<IResult<T>> {
    const query = `SELECT * FROM ${this.schema}.${this.tableName}`;
    return this.query(query);
  }

  public async getById(id: number): Promise<IResult<T>> {
    const query = `SELECT * FROM ${this.schema}.${this.tableName} WHERE id = @id`;
    return this.query(query, [{ name: "id", type: sql.Int, value: id }]);
  }

  public async create(data: T): Promise<IResult<T>> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO ${this.schema}.${this.tableName} (${keys.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
    return this.query(query);
  }

  public async update(id: number, data: T): Promise<IResult<T>> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `UPDATE ${this.schema}.${this.tableName} SET ${keys
      .map((key, index) => `${key} = ${values[index]}`)
      .join(", ")} WHERE id = @id`;
    return this.query(query, [{ name: "id", type: sql.Int, value: id }]);
  }

  public async delete(id: number): Promise<IResult<T>> {
    const query = `DELETE FROM ${this.schema}.${this.tableName} WHERE id = @id`;
    return this.query(query, [{ name: "id", type: sql.Int, value: id }]);
  }

  public async deleteAll(): Promise<IResult<T>> {
    const query = `DELETE FROM ${this.schema}.${this.tableName}`;
    return this.query(query);
  }

  public async executeQuery(query: string): Promise<IResult<T>> {
    return this.query(query);
  }

  public async close() {
    const pool = await this.connect();
    await pool.close();
    this.poolPromise = null;
  }
}
