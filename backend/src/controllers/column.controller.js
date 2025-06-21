import Column from "../model/Column.model.js";
const postColumns = async (req,res) => {

  const {title} = req.body;
  try {
    const newColumn = new Column({title});
    const data = await newColumn.save();
    res.status(201).json({success:true,message:"Post created successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:error})
  }
}

const getColumns = async (req,res) => {
  try {
    const data = await Column.find({});
    res.status(200).json({success:true,message:"Get successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
}

const deleteColumns = async (req,res) => {
  const {id} = req.params;
  try {
    const data = await Column.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"Delete successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
}

const updateColumns = async (req,res) => {
  const {id} = req.params;
  const {title} = req.body;
  try {
    const data = await Column.findByIdAndUpdate(id,{title});
    res.status(200).json({success:true,message:"Update successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
}

export default {postColumns,getColumns, deleteColumns, updateColumns};