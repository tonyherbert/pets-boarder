import { VaccineForm } from './../../../types/Vaccines.d';
import { db } from "@/firebase/firebase";
import {
  doc,
  collection,
  addDoc,
  query,
  getDocs,
  where,
  updateDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import {vaccinesList} from '../../../data/vaccines-list'
import { VaccineFromFirestore, VaccineList } from "@/types/Vaccines";


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

export async function getVaccinesList(): Promise<VaccineList[]> {
    try {
    const vaccinesCollection = collection(db, "listVaccines");
    const vaccinesSnapshot = await getDocs(vaccinesCollection);
    const vaccinesList = vaccinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VaccineList));
    return vaccinesList;
  } catch (e) {
    console.error("Erreur lors de la récupération des vaccins : ", e);
    return [];
  }
}

export async function getPetVaccines(
  userId: string,
  petId: string
): Promise<VaccineFromFirestore[]> {
  const vaccinesCollection = collection(db, "vaccine");
  const q = query(
    vaccinesCollection,
    where("ownerId", "==", userId)
  );
  
  const querySnapshot = await getDocs(q);

  const vaccines: VaccineFromFirestore[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as DocumentData;

    const petRef = data.pet as DocumentReference;

    if (petRef.id === petId) {
      vaccines.push({ id: doc.id, ...data } as VaccineFromFirestore);
    }
  });

  return vaccines;
}

export async function addPetVaccine(
  userId: string,
  petId: string,
  vaccineData: VaccineForm
): Promise<string> {
  const vaccinesCollection = collection(db, "vaccine");

  const petDocRef = doc(db, "pets", petId); 

  const vaccinesDocRef = await addDoc(vaccinesCollection, {
    ...vaccineData,
    ownerId: userId,
    pet: petDocRef,
    createdAt: Date.now()
  });

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