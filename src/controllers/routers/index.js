import users from './users.routes';
import lists from './lists.routes';

const router = (app) => {
  const prefix = '/api';
  app.use(`${prefix}/users`, users);
  app.use(`${prefix}/lists`, lists);
};

export default router;
