import express from 'express';
import { createUser, getUser, updateUser } from '../../services/users.service';
import { success, error } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validateHandler';
import {
  createUsersSchema,
  userIdSchema,
  updateUsersSchema,
} from '../schemas/users';

const routes = express.Router();

routes.get(
  '/:id',
  validatorHandler({ id: userIdSchema }, 'params'),
  async (req, res, next) => {
    try {
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
