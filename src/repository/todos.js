import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
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

export const putData = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return;
  }

  const dataRef = doc(db, db_collection, id);
  const docSnap = await getDoc(dataRef);

  if (!docSnap) {
    return;
  }

  const currentValue = docSnap.data().status;

  try {
    await updateDoc(dataRef, {
      status: !currentValue,
    });
    res.status(200).json({ message: 'success update data' });
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ message: 'Fail to update data', error: error.message });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const dataRef = doc(db, db_collection, id);
    const docSnap = await getDoc(dataRef);

    if (!docSnap) {
      return;
    }

    await deleteDoc(dataRef);
    res.status(200).json({ message: 'success delete data' });
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ message: 'Fail to delete data', error: error.message });
  }
};
