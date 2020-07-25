import { config } from '../../config/config';
import { error } from '../middlewares/responseHandler';

export const logsError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export const errorHandle = (err, req, res, next) => {
  if (config.environment.dev) {
    return error(req, res, { error: err.message, stack: err.stack }, 500);
  }
  return error(req, res, '', 500);
};
