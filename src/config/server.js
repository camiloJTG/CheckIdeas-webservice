import express from 'express';
import router from '../controllers/routers';
import cors from 'cors';

import {
  errorHandle,
  logsError,
} from '../controllers/middlewares/errorHandler';

const app = express();

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routers
router(app);

// error middlewares
app.use(logsError);
app.use(errorHandle);

export default app;
