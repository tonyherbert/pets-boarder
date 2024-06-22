import { db } from "@/firebase/firebase";
import useUserStore from "@/stores/user-store";
import { doc, setDoc } from "firebase/firestore";

export async function createUserDocument(uid: string, email: string) {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, {
    email: email,
  });
}

export function getCurrentUserId(): string | null {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;
  return userId;
}
