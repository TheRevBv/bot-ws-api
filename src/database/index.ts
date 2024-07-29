import "dotenv/config";
import { MysqlAdapter } from "@bot-whatsapp/database-mysql";
import { MysqlAdapterCredentials } from "@bot-whatsapp/mysql-database";

// Define las credenciales para la conexión a la base de datos
const credentials: MysqlAdapterCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT || 3306,
};

console.log(credentials);

export default new MysqlAdapter(credentials);
