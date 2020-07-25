import joi from '@hapi/joi';

const userUsernameSchema = joi.string().max(80).min(1).trim();
const userMailSchema = joi.string().max(80).min(1).trim();
const userPasswordSchema = joi.string().max(200).min(1);

export const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

export const createUsersSchema = {
  username: userUsernameSchema.required(),
  mail: userMailSchema.required(),
  password: userPasswordSchema.required(),
};

export const updateUsersSchema = {
  username: userUsernameSchema,
  mail: userMailSchema,
  password: userPasswordSchema,
};
