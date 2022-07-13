import { getLoggerInstance } from '../utils/logger';
const logger = getLoggerInstance();
import config from '../../config/index';
import { bootstrapDatabase, clearDatabaseCache } from './typeorm';
import { loadTemplates } from '../templates/index';

export const bootstrap = async (): Promise<boolean> => {
  try {
    await bootstrapDatabase();
    logger.info(`postgres connected host: ${config.database.host} , port: ${config.database.port}`);
    await loadTemplates();
  } catch (err) {
    logger.error('Error while connecting database', err);
    throw err;
  }
  return Promise.resolve(true);
};
