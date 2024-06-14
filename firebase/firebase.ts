import { initializeApp } from "firebase/app";
import { clientConfig } from "../config";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(clientConfig);
export const db = getFirestore(app);
