import joi from '@hapi/joi';

const itemTitleSchema = joi.string().max(100).min(1).trim();
const itemDescriptionSchema = joi.string().max(10000).min(1).trim();
const itemIsCompletedSchema = joi.boolean();
const itemListIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

export const itemIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

export const createItemSchema = {
  title: itemTitleSchema.required(),
  isCompleted: itemIsCompletedSchema.required(),
  description: itemDescriptionSchema.required(),
  listId: itemListIdSchema.required(),
};

export const updateItemSchema = {
  title: itemTitleSchema,
  isCompleted: itemIsCompletedSchema,
  description: itemDescriptionSchema,
  listId: itemListIdSchema.required(),
};

export const getOneItemByListIdSchema = {
  itemId: itemIdSchema.required(),
  listId: itemListIdSchema.required(),
};
