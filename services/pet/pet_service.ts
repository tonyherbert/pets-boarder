import { db } from "@/firebase/firebase";
import { doc, collection, setDoc, addDoc } from "firebase/firestore";

export async function createPet(userId: string, animalData: any) {
  const animalsCollection = collection(db, `users/${userId}/animals`);
  const animalDocRef = await addDoc(animalsCollection, animalData);
  return animalDocRef.id;
}

export async function addPetlWeight(
  userId: string,
  animalId: string,
  weightData: any
) {
  const weightsCollection = collection(
    db,
    `users/${userId}/animals/${animalId}/weights`
  );
  const weightDocRef = await addDoc(weightsCollection, weightData);
  return weightDocRef.id;
}
