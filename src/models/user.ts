import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  id: string;
  password: string;
}

const userSchema: Schema = new Schema({
  id: { type: String },
  password: { type: String },
});

export default mongoose.model<User>('user', userSchema, 'user');
