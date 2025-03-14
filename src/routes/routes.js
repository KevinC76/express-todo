import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('getTodo'));
router.post('/', (req, res) => res.send('postTodo'));
router.put('/:id', (req, res) => res.send('updateTodo'));
router.delete('/:id', (req, res) => res.send('deleteTodo'));

export default router;
