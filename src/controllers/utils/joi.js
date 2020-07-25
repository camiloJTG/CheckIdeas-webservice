import joi from '@hapi/joi';

export const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data);
  return error;
};
