import express from 'express';
import { error, success } from '../middlewares/responseHandler';
import { getCredential } from '../../services/auth.service';
import { GetCredentialSchema } from '../schemas/auth';
import { validatorHandler } from '../middlewares/validateHandler';

const routes = express.Router();

routes.post(
  '/',
  validatorHandler(GetCredentialSchema),
  async (req, res, next) => {
    try {
      const result = await getCredential(req.body);
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
