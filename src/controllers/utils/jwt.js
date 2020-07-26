import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

const secret = config.jwt.secretKey;

export const sign = (payload) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  return token;
};

export const verify = (token) => {
  const result = jwt.verify(token, secret);
  return result;
};

export const decode = (token) => {
  const result = jwt.decode(token);
  return result;
};
