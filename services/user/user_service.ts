import { app, db } from "@/firebase/firebase";
import useUserStore from "@/stores/user-store";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function createUserDocument(uid: string, email: string) {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, {
    email: email,
  });
}

export function getCurrentUserId(): string | null {
  const userId = useUserStore.getState().id;
  if (!userId) return null;
  return userId;
}
