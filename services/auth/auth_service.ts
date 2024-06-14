import { app } from "@/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser(email: string, password: string) {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password);
}
