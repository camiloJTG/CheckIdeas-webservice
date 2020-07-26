import express from 'express';
import { createUser, getUser, updateUser } from '../../services/users.service';
import { success, error } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validateHandler';
import { checkAuth } from '../middlewares/authHandler';
import { cacheResponse } from '../utils/cache';
import {
  createUsersSchema,
  userIdSchema,
  updateUsersSchema,
} from '../schemas/users';
import { config } from '../../config/config';

const routes = express.Router();

routes.get(
  '/:id',
  checkAuth,
  validatorHandler({ id: userIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      cacheResponse(res, config.cache.fiveMinuteInSeconds);
      const result = await getUser(req.params.id);
      if (result.status === 200) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

routes.post(
  '/',
  validatorHandler(createUsersSchema),
  async (req, res, next) => {
    try {
      const result = await createUser(req.body);
      if (result.status === 201) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

routes.put(
  '/:id',
  checkAuth,
  validatorHandler({ id: userIdSchema }, 'params'),
  validatorHandler(updateUsersSchema),
  async (req, res, next) => {
    try {
      const result = await updateUser(req.body, req.params.id);
      if (result.status === 200) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

export default routes;
