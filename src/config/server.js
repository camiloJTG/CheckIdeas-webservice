import express from 'express';
import router from '../controllers/routers';
import {
  errorHandle,
  logsError,
} from '../controllers/middlewares/errorHandler';

const app = express();

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
router(app);

// error middlewares
app.use(logsError);
app.use(errorHandle);

export default app;
