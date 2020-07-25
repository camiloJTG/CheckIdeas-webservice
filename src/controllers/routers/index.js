import users from './users.routes';

const router = (app) => {
  const prefix = '/api';
  app.use(`${prefix}/users`, users);
};

export default router;
