import joi from '@hapi/joi';

const listNameSchema = joi.string().max(80).min(1).trim();
const listUserIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

export const listIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

export const createListSchema = {
  name: listNameSchema.required(),
  userId: listUserIdSchema.required(),
};

export const updateListSchema = {
  name: listNameSchema,
  userId: listUserIdSchema.required(),
};

export const getOneListByUserIdSchema = {
  userId: listUserIdSchema.required(),
  listId: listIdSchema.required(),
};
