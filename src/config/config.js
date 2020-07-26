export const config = {
  environment: {
    port: process.env.PORT || 3000,
    dev: process.env.NODE_ENV !== 'production',
  },
  database: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
};
