"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { useMainStore } from "@/stores/main-store";
import { useState, useEffect } from "react";
import useUserStore from "@/stores/user-store";
import { Logout } from "@/services/auth/auth_service";
import { getPetByIdAndUpdateStore } from "@/dataManager/petDataManager";

interface HomePageProps {
  userId?: string;
}

export default function ApplicationPage({ userId }: HomePageProps) {
  const router = useRouter();
  async function handleLogout() {
    const result = await Logout();
    if (!result.error) router.push("/login");
  }

  const { openModal } = useMainStore().actions;
  const { modal } = useMainStore();
  const [pets, setPets] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
getPetByIdAndUpdateStore(userId!);      
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-xl mb-4">Super secure home page</h1>
      <p className="mb-8">Only holds the magic key to this kingdom!</p>
      <button
        onClick={handleLogout}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
    </main>
  );
}
