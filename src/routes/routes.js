import express from 'express';
import { fetchData, postData } from '../repository/todos.js';

const router = express.Router();

router.get('/', fetchData);
router.post('/', postData);
router.put('/:id', (req, res) => res.send('updateTodo'));
router.delete('/:id', (req, res) => res.send('deleteTodo'));

export default router;
