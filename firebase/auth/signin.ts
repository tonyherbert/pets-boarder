import useUserStore from "@/stores/user-store";
import { app } from "../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
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
