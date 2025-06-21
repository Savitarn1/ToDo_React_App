import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  parentId: { type: String , required: true},
  title: { type: String, required: true},
  description: { type: String},
  order: { type: Number, required: true},
},{timestamps:true})

export default mongoose.model('ToDo', todoSchema);
