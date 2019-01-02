import express from 'express';
import BasicLogger from 'basic-logger';

import middlewaresConfig from './middlewares';
import database from './database';
import ApiRoutes from './routes';

const app = express();

global.log = new BasicLogger({ showTimestamp: true });
const logger = new BasicLogger({ showTimestamp: true });

database();

middlewaresConfig(app);

app.use('/api', ApiRoutes);

const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT);
  logger.info(`App listening at port ${PORT}`);
} catch (e) {
  logger.error(e);
  throw e;
}
