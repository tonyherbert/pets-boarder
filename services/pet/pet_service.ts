import { db } from "@/firebase/firebase";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { getCurrentUserId } from "../user/user_service";

export async function createPet(userId: string, animalData: any) {
  const animalsCollection = collection(db, `users/${userId}/animals`);
  const animalDocRef = await addDoc(animalsCollection, animalData);
  return animalDocRef.id;
}

export async function addPetWeight(
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

export async function getPetsByUser() {
  const userId = getCurrentUserId();
  console.log("userid", userId);

  // Référence à la collection des animaux de l'utilisateur
  const animalsCollection = collection(db, `users/${userId}/animals`);

  // Créer une requête pour obtenir tous les documents de la collection
  const q = query(animalsCollection);

  // Récupérer les documents
  const querySnapshot = await getDocs(q);

  // Transformer les documents en un tableau de données
  const animals = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return animals;
}
