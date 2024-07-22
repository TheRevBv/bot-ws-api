import MySQLAdapter from "@bot-whatsapp/database-mysql";

/**
 * Declaramos las conexiones de MySQL
 */

const MYSQL_DB_HOST = process.env.DB_HOST ?? "localhost";
const MYSQL_DB_USER = process.env.DB_USER ?? "root";
const MYSQL_DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const MYSQL_DB_NAME = process.env.DB_NAME ?? "wbotAga";
const MYSQL_DB_PORT = parseInt(process.env.DB_PORT) ?? 3306;

/**
 * Inicializamos el adaptador de MySQL
 */
const adapterDB = new MySQLAdapter({
  host: MYSQL_DB_HOST,
  user: MYSQL_DB_USER,
  database: MYSQL_DB_NAME,
  password: MYSQL_DB_PASSWORD,
  port: MYSQL_DB_PORT,
});

export default adapterDB;
