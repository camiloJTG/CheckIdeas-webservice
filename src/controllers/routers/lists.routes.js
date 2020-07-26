import express from 'express';

import {
  createListSchema,
  listIdSchema,
  updateListSchema,
  getOneListByUserIdSchema,
} from '../schemas/lists';
import {
  createList,
  getAllListsByUserId,
  getOneListByUserId,
  updateLlist,
  deleteList,
} from '../../services/lists.service';
import { cacheResponse } from '../utils/cache';
import { checkAuth } from '../middlewares/authHandler';
import { error, success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validateHandler';
import { config } from '../../config/config';

const routes = express.Router();

routes.post(
  '/',
  checkAuth,
  validatorHandler(createListSchema),
  async (req, res, next) => {
    try {
      const result = await createList(req.body);
      if (result.status === 201) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

routes.get(
  '/:id',
  checkAuth,
  validatorHandler({ id: listIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      cacheResponse(req, config.cache.fiveMinuteInSeconds);
      const result = await getAllListsByUserId(req.params.id);
      if (result.status === 200) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

routes.get(
  '/',
  checkAuth,
  validatorHandler(getOneListByUserIdSchema),
  async (req, res, next) => {
    try {
      cacheResponse(req, config.cache.sixtyMinuteInSecodns);
      const result = await getOneListByUserId(req.body);
      if (result.status === 200) {
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
  validatorHandler({ id: listIdSchema }, 'params'),
  validatorHandler(updateListSchema),
  async (req, res, next) => {
    try {
      const result = await updateLlist(req.params.id, req.body);
      if (result.status === 201) {
        return success(req, res, result.info, result.status);
      }
      return error(req, res, result.info, result.status);
    } catch (e) {
      next(e);
    }
  }
);

routes.delete(
  '/:id',
  checkAuth,
  validatorHandler({ id: listIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      const result = await deleteList(req.params.id);
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
