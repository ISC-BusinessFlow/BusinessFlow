import { CorsOptions } from 'cors';

const env =
  process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development';

export const accessPort = () => {
  const port = accessOrigin()?.split(':').slice(-1)[0];
  return parseInt(port!);
};

export const accessOrigin = () => {
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

export const corsOptions: CorsOptions = {
  origin: accessOrigin(),
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'application/json'],
};
