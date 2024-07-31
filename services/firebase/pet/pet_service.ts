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
  deleteDoc,
} from "firebase/firestore";
import { Pet, PetForm } from "@/types/Pets";



export async function createPet(userId: string, petDetails: PetForm) {
  const  animalsCollection = collection(db, `pets`);
  const  animalDocRef      = await addDoc(animalsCollection, {...petDetails, ownerId: userId});
  return animalDocRef.id;
}

export async function getPetsByUser(userId: string) {
  const petsCollection = collection(db,"pets");  
  const q              = query(petsCollection, where("ownerId", "==", userId));
  const querySnapshot  = await getDocs(q);

  const pets = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as unknown as Pet));

  return pets;
}

export async function getPetById(id: string, userId: string): Promise<Pet | undefined> {
  const petDoc = doc(db, "pets", id);
  const petSnapshot = await getDoc(petDoc);

  if (!petSnapshot.exists()) {
    throw new Error(`No pet found with id: ${id}`);
  }

  const petData = petSnapshot.data();
  if (petData?.ownerId !== userId) {
    throw new Error(`Pet with id: ${id} does not belong to the user.`);
  }

  return { id: petSnapshot.id, ...petData } as Pet;
}

export async function updatePet(id: string, userId: string, petDetails: PetForm) {
  const petDocRef = doc(db, "pets", id);

  // Vérifiez que l'animal appartient bien à l'utilisateur
  const petSnapshot = await getDoc(petDocRef);
  if (!petSnapshot.exists() || petSnapshot.data()?.ownerId !== userId) {
    throw new Error(`Pet with id: ${id} does not belong to the user.`);
  }

  await setDoc(petDocRef, petDetails, { merge: true });
}

export async function deletePet(id: string, userId: string) {
  const petDocRef = doc(db, "pets", id);

  // Vérifiez que l'animal appartient bien à l'utilisateur
  const petSnapshot = await getDoc(petDocRef);
  if (!petSnapshot.exists() || petSnapshot.data()?.ownerId !== userId) {
    throw new Error(`Pet with id: ${id} does not belong to the user.`);
  }

  await deleteDoc(petDocRef);
}
