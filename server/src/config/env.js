import Joi from 'joi';

const envSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  GEMINI_API_KEY: Joi.string().required(),
  PORT: Joi.number().default(3000),
}).unknown();

const { error } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.details[0].message}`);
}