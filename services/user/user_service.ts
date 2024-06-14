import { app, db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function createUserDocument(uid: string, email: string) {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, {
    email: email,
  });
}

export function getCurrentUserUid(): string | null {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
}
