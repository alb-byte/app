import { connect } from 'mongoose';
import config from '../config';

export default async (): Promise<void> => {
  await connect(config.mongoose.mongodbConnectionString);
};
