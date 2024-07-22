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
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Pet, PetForm } from "@/types/Pets";
import { getCurrentUserId } from "@/services/user/user_service";
import {vaccinesList} from '../../../data/vaccines-list'


export const populateDb = async () => {
  try {
    const vaccinsCollection = collection(db, "listVaccines");
    for (const vaccin of vaccinesList) {
      const docRef = await addDoc(vaccinsCollection, vaccin);
      console.log(`Document ajouté avec ID: ${docRef.id}`);
    }
  } catch (e) {
    console.error("Erreur lors de l'ajout des documents : ", e);
  }
};


export async function getPetVaccines(
  userId: string,
  petId: string
): Promise<any[]> {
  const vaccinesCollection = collection(db, "vaccine");
  const q = query(
    vaccinesCollection,
    where("ownerId", "==", userId),
    where("petId", "==", petId)
  );
  const querySnapshot = await getDocs(q);

  const vaccines: any[] = [];
  querySnapshot.forEach((doc) => {
    vaccines.push({ id: doc.id, ...doc.data() } as any );
  });
  return vaccines;
}

export async function addPetVaccine(
  userId: string,
  petId: string,
  vaccineData: any
): Promise<string> {
  const vaccinesCollection = collection(db, "vaccine");
  const vaccinesDocRef = await addDoc(vaccinesCollection, {...vaccineData, ownerId: userId, petId, createdAt: new Date()});
  return vaccinesDocRef.id;
}

export async function updatePetVaccine(
  VaccineId: string,
  newVaccineData: any
): Promise<void> {
  const vaccineDocRef = doc(db, "vaccine", VaccineId);
  await updateDoc(vaccineDocRef, {
    vaccine: newVaccineData,
    date: new Date(),
  });
}

export async function deletePetVaccine(vaccineId: string): Promise<void> {
  const vaccineDocRef = doc(db, "vaccine", vaccineId);
  await deleteDoc(vaccineDocRef);
}