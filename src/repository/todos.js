import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const db_collection = 'todos';

export const fetchData = async (req, res) => {
  try {
    const dataRef = collection(db, db_collection);
    const dataSnap = await getDocs(dataRef);
    const data = dataSnap.docs.map((todo) => todo.data());
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ message: 'Fail to fetch data', error: error.message });
  }
};

export const postData = async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return;
  }

  try {
    await setDoc(doc(db, db_collection, todo), {
      status: false,
      create: serverTimestamp(),
    });
    res.status(200).json({ message: 'success post data' });
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ message: 'Fail to post data', error: error.message });
  }
};

export const putData = async () => {};

export const deleteData = async () => {};
