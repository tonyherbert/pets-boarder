import { app } from "@/firebase/firebase";
import useUserStore                                                                     from "@/stores/user-store";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserDocument } from "../user/user_service";

const auth = getAuth(app);

export  async function signUp(email: string, password: string) {
  let result, error;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
             
    await createUserDocument(result.user.uid, result.user.email!);

  } catch (e) {
    error = e;
  }

  return { result, error };
}


export  async function signIn(email: string, password: string) {
  let result,error,idToken;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
 useUserStore.setState({
        id: result.user.uid,
        email: result.user.email,
      });
      localStorage.setItem("userId", result.user.uid);
       idToken = await result.user.getIdToken();
    
  } catch (e) {
    error = e;
  }

  return { result,idToken, error };
}

export  async function Logout() {
  let error;
  try {
   await signOut(auth);
   await fetch("/api/logout");

  useUserStore.setState({
      id: null,
    });
    localStorage.removeItem("userId");
  
  } catch (e) {
    error = e;
  }

  return { error };
}