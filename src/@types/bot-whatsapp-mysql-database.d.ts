// import type { RowDataPacket } from "mysql2";
declare module "@bot-whatsapp/mysql-database" {
  import { RowDataPacket } from "mysql2";
  type MysqlAdapterCredentials = {
    host: string;
    user: string;
    database: string;
    password: string;
    port: number;
  };

  type HistoryRow = RowDataPacket & {
    id: number;
    ref: string;
    keyword: string | null;
    answer: string;
    refSerialize: string;
    phone: string;
    options: string;
    created_at: Date;
  };
}
