import Column from '../model/Column.model.js';

class ColumnController {
  async postColumns(req, res) {
    const { _id , title } = req.body;
    try {
      const newColumn = new Column({ _id,title });
      const data = await newColumn.save();
      res
        .status(201)
        .json({ success: true, message: 'Post created successfully', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }}

  async getColumns(req, res) {
  try {
    const data = await Column.find({});
    res.status(200).json({ success: true, message: 'Get successfully', data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }}
    
  async deleteColumns (req, res) {
    const { id } = req.params;
    try {
      await Column.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: 'Delete successfully'},{new:true});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  async updateColumns ( req, res) {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const data = await Column.findByIdAndUpdate(id, { title });
    res
      .status(200)
      .json({ success: true, message: 'Update successfully', data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
}
export default new ColumnController;
