import express from 'express';
const router = express.Router();
import TodoController from '../controllers/todo.controller.js';


router.post('/', TodoController.posttodos);
router.get('/', TodoController.gettodos);
router.delete('/:id', TodoController.deletetodos);
router.put('/:id', TodoController.updatetodos);

export default router;