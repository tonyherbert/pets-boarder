import { notFound } from "next/navigation";
import ApplicationPage from "./ApplicationPage";
import { fetchTokens } from "@/utils/tokens";

export default async function Home() {
  const tokens = await fetchTokens();
  if (!tokens) notFound();
  
  return <ApplicationPage />;
}