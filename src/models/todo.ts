import mongoose, { Schema, Document } from 'mongoose';

export interface Todo extends Document {
  _id: number;
  title: string;
  date: string;
}

const TodoSchema: Schema = new Schema({
  _id: { type: Number },
  title: { type: String },
  date: { type: String },
});

export default mongoose.model<Todo>('post', TodoSchema, 'post');
