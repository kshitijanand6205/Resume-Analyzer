import Joi from 'joi';

const envSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  GROQ_API_KEY: Joi.string().required(),
  PORT: Joi.number().default(3000),
  FRONTEND_URL: Joi.string().optional(),
}).unknown();

const { error } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.details[0].message}`);
}
