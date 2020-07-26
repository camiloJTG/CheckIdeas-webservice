import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY;

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
