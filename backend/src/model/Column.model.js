import mongoose from "mongoose";
const columnSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
},{timestamps:true})

export default mongoose.model('Column', columnSchema);
