import ToDo from '../model/ToDo.model.js';

class TodoController {
  async gettodos(req, res) {
    try {
      const data = await ToDo.find({});
      res
        .status(200)
        .json({ success: true, message: 'Get successfully', data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
  async posttodos(req, res) {
    const { parentId, title, description } = req.body;
    try {
      const newtodo = new ToDo({ parentId, title, description });
      const data = await newtodo.save();
      res
        .status(201)
        .json({ success: true, message: 'Post created successfully', data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async deletetodos(req, res) {
    const { id } = req.params;
    try {
      const todo = await ToDo.findByIdAndDelete(id);
      if (!todo) {
        return res
          .status(404)
          .json({ success: false, message: 'Todo not found' });
      }
      res
        .status(200)
        .json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async updatetodos(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const data = await ToDo.findByIdAndUpdate(id, { title });
      res
        .status(200)
        .json({ success: true, message: 'Update successfully', data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}

export default new TodoController();
