import { db } from "../../firebase/firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

type WeightData = {
  value: number;
  unit: string;
};

type Weight = {
  id: string;
  weight: WeightData;
  petId: string;
  date: Date;
  ownerId: string;
};

export async function addPetWeight(
  userId: string,
  petId: string,
  weightData: WeightData
): Promise<string> {
  const weightsCollection = collection(db, "weight");
  const weightDocRef = await addDoc(weightsCollection, {
    weight: weightData,
    petId,
    date: new Date(),
    ownerId: userId,
  });
  return weightDocRef.id;
}

export async function getPetWeights(
  userId: string,
  petId: string
): Promise<Weight[]> {
  const weightsCollection = collection(db, "weight");
  const q = query(
    weightsCollection,
    where("ownerId", "==", userId),
    where("petId", "==", petId)
  );
  const querySnapshot = await getDocs(q);

  const weights: Weight[] = [];
  querySnapshot.forEach((doc) => {
    weights.push({ id: doc.id, ...doc.data() } as Weight);
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