import express from 'express';

import {
  createItems,
  getAllItemsByItemId,
  getOneItemByItemId,
  updateItem,
  deleteItem,
} from '../../services/items.service';
import {
  createItemSchema,
  itemIdSchema,
  updateItemSchema,
  getOneItemByListIdSchema,
} from '../schemas/items';
import { checkAuth } from '../middlewares/authHandler';
import { error, success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validateHandler';

const routes = express.Router();

routes.post(
  '/',
  checkAuth,
  validatorHandler(createItemSchema),
  async (req, res, next) => {
    try {
      const result = await createItems(req.body);
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
  '/:id',
  checkAuth,
  validatorHandler({ id: itemIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      const result = await getAllItemsByItemId(req.params.id);
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
  validatorHandler(getOneItemByListIdSchema),
  async (req, res, next) => {
    try {
      const result = await getOneItemByItemId(req.body);
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
  validatorHandler({ id: itemIdSchema }, 'params'),
  validatorHandler(updateItemSchema),
  async (req, res, next) => {
    try {
      const result = await updateItem(req.params.id, req.body);
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
  validatorHandler({ id: itemIdSchema }, 'params'),
  async (req, res, next) => {
    try {
      const result = await deleteItem(req.params.id);
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
