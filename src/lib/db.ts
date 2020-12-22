import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const db = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.DB_HOST, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log('database connected');
};
