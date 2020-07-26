import { config } from '../../config/config';

export const cacheResponse = (res, seconds) => {
  if (!config.environment.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
};
