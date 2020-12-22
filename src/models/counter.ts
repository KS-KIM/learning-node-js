import mongoose, { Document, Schema } from 'mongoose';

export interface Counter extends Document {
  totalPost: number;
  name: string;
}

const counterSchema: Schema = new Schema({
  totalPost: { type: Number },
  name: { type: String },
});

export default mongoose.model<Counter>('counter', counterSchema, 'counter');
