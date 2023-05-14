import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
export const firebaseConfig = {
  apiKey: "AIzaSyDiNLAxuhT_qeYpNLG5GHazPHs8QECBCUM",
  authDomain: "e-commerce-f10ff.firebaseapp.com",
  projectId: "e-commerce-f10ff",
  storageBucket: "e-commerce-f10ff.appspot.com",
  messagingSenderId: "111177944316",
  appId: "1:111177944316:web:341bf0bd541b265ce95b79"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getFirestore(app);
export const storage = getStorage(app);
export default app;