import { db } from "@/firebase/firebase";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import { getCurrentUserId } from "../user/user_service";

export async function createPet(userId: string, petDetails: any) {
  const animalsCollection = collection(db, `pets`);
  const animalDocRef = await addDoc(animalsCollection, {petDetails, ownerId: userId});
  return animalDocRef.id;
}

export async function getPetsByUser() {
  const userId = getCurrentUserId();
  
  const petsCollection = collection(db,"pets");  

  const q = query(petsCollection, where("ownerId", "==", userId));

  const querySnapshot = await getDocs(q);

  const pets = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  return pets;
}
