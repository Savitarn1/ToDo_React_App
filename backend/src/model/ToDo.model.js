import { model, Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    parentId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default new model('ToDo', todoSchema);
