import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const db = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.DB_HOST, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log('database connected');
};