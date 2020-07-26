import joi from '@hapi/joi';

const authMailSchema = joi.string().max(100).min(1).trim();
const authPasswordSchema = joi.string().max(10000).min(1);

export const GetCredentialSchema = {
  mail: authMailSchema.required(),
  password: authPasswordSchema.required(),
};
