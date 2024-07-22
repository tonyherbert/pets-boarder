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

