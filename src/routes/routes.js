import express from 'express';
import {
  fetchData,
  putData,
  postData,
  deleteData,
} from '../repository/todos.js';

const router = express.Router();

router.get('/', fetchData);
router.post('/', postData);
router.put('/:id', putData);
router.delete('/:id', deleteData);

export default router;
