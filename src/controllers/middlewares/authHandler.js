import { decode, verify } from '../utils/jwt';
import { error } from '../middlewares/responseHandler';

export const checkAuth = async (req, res, next) => {
  const token = req.headers['x-access-token'] || '';

  const decodedToken = decode(token);
  if (!decodedToken) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return error(req, res, 'Invalid Token', 401);
  }

  const verifyToken = verify(token);
  if (!verifyToken) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return error(req, res, 'Invalid Token', 401);
  }
  next();
};
