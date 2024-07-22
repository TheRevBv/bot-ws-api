declare module "@bot-whatsapp/database-mysql" {
  export default class MySQLAdapter {
    constructor(config: {
      host: string;
      user: string;
      database: string;
      password: string;
      port: number;
    });
  }
}
