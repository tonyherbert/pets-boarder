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
  getDoc,
} from "firebase/firestore";
import { getCurrentUserId } from "../user/user_service";
import { Pet, PetForm } from "@/types/Pets";


export async function createPet(userId: string, petDetails: PetForm) {
  const  animalsCollection = collection(db, `pets`);
  const  animalDocRef      = await addDoc(animalsCollection, {...petDetails, ownerId: userId});
  return animalDocRef.id;
}

export async function getPetsByUser() {
  const userId = getCurrentUserId();

  const petsCollection = collection(db,"pets");  
  const q              = query(petsCollection, where("ownerId", "==", userId));
  const querySnapshot  = await getDocs(q);

  const pets = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as unknown as Pet));

  return pets;
}

export async function getPetById(id: string) {
  const petDoc = doc(db, "pets", id);
  const petSnapshot = await getDoc(petDoc);

  if (!petSnapshot.exists()) {
    throw new Error(`No pet found with id: ${id}`);
  }

  return { id: petSnapshot.id, ...petSnapshot.data() };
}

