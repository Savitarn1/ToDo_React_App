import ToDo from '../model/ToDo.model.js';

const posttodos = async (req, res) => {
  const { parentId, title, description, order } = req.body;
  try {
    const newtodo = new ToDo({ parentId, title, description, order });
    const data = await newtodo.save();
    res
      .status(201)
      .json({ success: true, message: 'Post created successfully', data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const gettodos = async (req, res) => {
  try {
    const data = await ToDo.find({});
    res.status(200).json({ success: true, message: 'Get successfully', data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deletetodos = async (req,res) => {
  const {id} = req.params;
  try {
    const data = await ToDo.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"Delete successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
}

const updatetodos = async (req,res) => {
  const {id} = req.params;
  const {title} = req.body;
  try {
    const data = await ToDo.findByIdAndUpdate(id,{title});
    res.status(200).json({success:true,message:"Update successfully",data})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server error"})
  }
} 

export  {posttodos , gettodos , deletetodos , updatetodos};
