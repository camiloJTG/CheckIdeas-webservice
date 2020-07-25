import { validate } from '../utils/joi';

export const validatorHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(error) : next();
  };
};
