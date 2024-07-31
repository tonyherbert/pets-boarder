import { clientConfig, serverConfig } from "@/config";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export async function fetchTokens() {
  const tokenCookies = cookies();
  const tokens = await getTokens(tokenCookies, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  
  return {userId: tokens?.decodedToken?.uid, tokens} ;
}