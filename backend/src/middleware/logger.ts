import morgan from 'morgan';
import { config } from '../config/default';

export const logger = morgan(
  config.nodeEnv === 'development' ? 'dev' : 'combined'
);

