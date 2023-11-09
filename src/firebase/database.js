import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "./index";
//init firebase
const db = getFirestore(firebaseApp);
// create doc
export const createDoc = async (colName, data) => {
  const res = await addDoc(collection(db, colName), { ...data });
};
// create doc
export const getData = async (colName) => {
  const data = await getDocs(collection(db, colName));

  const dataList = [];
  data.forEach((item) => {
    dataList.push(item.data());
  });
  return dataList;
};
// snapshot
export const getRealTimeData = async (colName, stateName) => {
  onSnapshot(
    query(collection(db, colName), where("status", "==", true)),
    (snapShot) => {
      /**(snapShot) se realtime data gula sathe sathe dhore felbe */
      const dataList = [];
      snapShot.docs.forEach((item) => {
        dataList.push({ ...item.data(), id: item.id });
      });
      stateName(dataList);
    }
  );
};
// snapshot
export const deletedata = async (colName, id) => {
  await deleteDoc(doc(db, colName, id));
};
