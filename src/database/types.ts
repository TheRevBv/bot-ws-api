/**
 * Tipos de credenciales para SQL Server.
 */
export interface SQLServerAdapterCredentials {
  user: string;
  password: string;
  server: string;
  database: string;
  port?: number;
  options?: {
    encrypt?: boolean;
    trustServerCertificate?: boolean;
  };
}

export interface HistoryRow {
  id: number;
  ref: string;
  keyword: string | null;
  answer: string;
  refSerialize: string;
  phone: string;
  options: string;
  created_at: Date;
}
