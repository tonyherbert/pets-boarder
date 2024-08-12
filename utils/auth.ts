import { fetchTokens } from "./tokens";

export async function getAuthenticatedUserId(): Promise<string> {
  const { userId } = await fetchTokens();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return userId;
}