import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Joi from "joi";

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filename = ".env";

config({ path: path.resolve(__dirname, `../../${filename}`) });

// Definir el esquema de validación con Joi
const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  PHONE_DEFAULT: Joi.string(),
  USE_PHONE_PREX_DEFAULT: Joi.bool().default(false),
  PREX_PHONE_DEFAULT: Joi.string().default("+521"),
  API_PREFIX: Joi.string().default("api").example("api/v1"),
  ENDPOINT: Joi.string().uri(),
  ENVIRONMENT: Joi.string()
    .valid("development", "production", "test")
    .required(),
  OPENAI_API_KEY: Joi.string(),

  // Configuración de la base de datos MySQL
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_ENCRYPT: Joi.boolean(),
  DB_TRUST_SERVER_CERTIFICATE: Joi.boolean().required(),

  // Configuración de la base de datos externa
  EXTERNAL_DB_HOST: Joi.string(),
  EXTERNAL_DB_PORT: Joi.number(),
  EXTERNAL_DB_USER: Joi.string(),
  EXTERNAL_DB_PASSWORD: Joi.string(),
  EXTERNAL_DB_DATABASE: Joi.string(),

  FILE_SERVER_PATH: Joi.string(),
}).unknown(); // Permitir variables de entorno adicionales

// Validar las variables de entorno
const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  console.error("Error de validación en las variables de entorno:");
  error.details.forEach((detail) => {
    console.error(`- ${detail.message}`);
  });
  process.exit(1); // Salir de la aplicación si hay errores en la configuración
}

// Exportar la configuración validada
const configs = {
  PORT: envVars.PORT,
  API_PREFIX: envVars.API_PREFIX,
  PHONE_DEFAULT: envVars.PHONE_DEFAULT,
  USE_PHONE_PREX_DEFAULT: envVars.USE_PHONE_PREX_DEFAULT,
  PREX_PHONE_DEFAULT: envVars.PREX_PHONE_DEFAULT,
  ENDPOINT: envVars.ENDPOINT,
  ENVIRONMENT: envVars.ENVIRONMENT,
  OPENAI_API_KEY: envVars.OPENAI_API_KEY,

  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_NAME: envVars.DB_NAME,
  DB_ENCRYPT: envVars.DB_ENCRYPT,
  DB_TRUST_SERVER_CERTIFICATE: envVars.DB_TRUST_SERVER_CERTIFICATE,

  EXTERNAL_DB_HOST: envVars.EXTERNAL_DB_HOST,
  EXTERNAL_DB_PORT: envVars.EXTERNAL_DB_PORT,
  EXTERNAL_DB_USER: envVars.EXTERNAL_DB_USER,
  EXTERNAL_DB_PASSWORD: envVars.EXTERNAL_DB_PASSWORD,
  EXTERNAL_DB_DATABASE: envVars.EXTERNAL_DB_DATABASE,

  FILE_SERVER_PATH: envVars.FILE_SERVER_PATH,
};

export default configs;
