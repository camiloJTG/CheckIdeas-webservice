import '@babel/polyfill';
import 'dotenv/config';

import app from './server';
import { config } from './config';

const main = async () => {
  app.listen(config.environment.port);
  console.log(`Server on port ${config.environment.port}`);
};

main();
