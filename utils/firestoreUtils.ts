import { Pet } from "@/types/Pets";
import { Timestamp } from "firebase/firestore";

export const mapFirestoreDocToPet = (doc: any): Pet => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    birthDate: (data.birthDate as Timestamp).toDate(), 
  };
};