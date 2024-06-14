import { app } from "@/firebase/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

interface AddDataResult {
  result: any | null;
  error: Error | null;
}

export default async function addData(
  collection: string,
  id: string,
  data: any
): Promise<AddDataResult> {
  let result: any | null = null;
  let error: Error | null = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
