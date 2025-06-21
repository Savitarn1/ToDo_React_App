import express from 'express';
const router = express.Router();
import columnController from '../controllers/column.controller.js';

router.post('/', columnController.postColumns);
router.get('/', columnController.getColumns);
router.delete('/:id', columnController.deleteColumns);
router.put('/:id', columnController.updateColumns);

export default router;