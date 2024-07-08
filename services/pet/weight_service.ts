import { Weight, WeightForm, WeightFromFirestore } from "@/types/Weight";
import { db } from "../../firebase/firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";



export async function addPetWeight(
  userId: string,
  petId: string,
  weightData: WeightForm
): Promise<string> {
  const weightsCollection = collection(db, "weight");
  const weightDocRef = await addDoc(weightsCollection, {...weightData, ownerId: userId, petId, createdAt: new Date()});
  return weightDocRef.id;
}

export async function getPetWeights(
  userId: string,
  petId: string
): Promise<WeightFromFirestore[]> {
  const weightsCollection = collection(db, "weight");
  const q = query(
    weightsCollection,
    where("ownerId", "==", userId),
    where("petId", "==", petId)
  );
  const querySnapshot = await getDocs(q);

  const weights: Weight[] = [];
  querySnapshot.forEach((doc) => {
    weights.push({ id: doc.id, ...doc.data() } as Weight );
  });
  return weights;
}

export async function updatePetWeight(
  weightId: string,
  newWeightData: WeightData
): Promise<void> {
  const weightDocRef = doc(db, "weight", weightId);
  await updateDoc(weightDocRef, {
    weight: newWeightData,
    date: new Date(),
  });
}

export async function deletePetWeight(weightId: string): Promise<void> {
  const weightDocRef = doc(db, "weight", weightId);
  await deleteDoc(weightDocRef);
}