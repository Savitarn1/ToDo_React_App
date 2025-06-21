import express from 'express';
const router = express.Router();
import {posttodos , gettodos , deletetodos , updatetodos} from '../controllers/todo.controller.js';


router.post('/', posttodos);
router.get('/', gettodos);
router.delete('/:id', deletetodos);
router.put('/:id', updatetodos);

export default router;