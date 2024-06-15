"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { useMainStore } from "@/stores/main-store";
import CreatePetForm from "../forms/pet/CreatePetForm";
import { getPetsByUser } from "@/services/pet/pet_service";
import { useState, useEffect } from "react";

interface HomePageProps {
  email?: string;
}

export default function Dashboard({ email }: HomePageProps) {
  const router = useRouter();
  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  }

  const { openModal } = useMainStore().actions;
  const { modal } = useMainStore();
  const [pets, setPets] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getPetsByUser();
        setPets(petsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);
  console.log("pets", pets);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-xl mb-4">Super secure home page</h1>
      <p className="mb-8">
        Only <strong>{email}</strong> holds the magic key to this kingdom!
      </p>
      <button
        onClick={handleLogout}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
      <button
        onClick={() => openModal(<CreatePetForm />)}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        openModal
      </button>
    </main>
  );
}
