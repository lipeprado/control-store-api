import mongoose from 'mongoose';
import BasicLogger from 'basic-logger';
import dotenv from 'dotenv';

const logger = new BasicLogger({ showTimestamp: true });

const enviroment = dotenv.config();

// Remove the warning with Promise
mongoose.Promise = global.Promise;

export default async () => {
  const {
    DB_NAME, DB_USER, DB_PASS, DB_URI,
  } = enviroment.parsed;
  try {
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASS}@${DB_URI}/${DB_NAME}?authMechanism=SCRAM-SHA-1`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );
  } catch (error) {
    logger.error(error);
    mongoose.createConnection(
      `mongodb://${DB_USER}:${DB_PASS}@${DB_URI}/${DB_NAME}?authMechanism=SCRAM-SHA-1`,
    );
  }
};
