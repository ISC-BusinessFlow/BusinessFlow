import { CorsOptions } from 'cors';

const env =
  process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development';

const accessOrigin = (env: String) => {
  switch (env) {
    case 'development':
      return process.env.DEVELOPMENT_URL;
    case 'production':
      return process.env.PRODUCTION_URL;
    case 'test':
      return process.env.TEST_URL;
    default:
      return process.env.DEVELOPMENT_URL;
  }
};

const corsOptions: CorsOptions = {
  origin: accessOrigin(env),
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'application/json'],
};

export default corsOptions;
