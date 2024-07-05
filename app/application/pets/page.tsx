"use client";
import CreatePetForm from "@/components/forms/pet/CreatePetForm";
import Card from "@/components/pets/card/card";
import { getPetsByUser } from "@/services/pet/pet_service";
import { useMainStore } from "@/stores/main-store";
import React, { useEffect, useState } from "react";

const Pets = () => {
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

  const { openModal } = useMainStore().actions;
  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <button
        onClick={() => openModal(<CreatePetForm />)}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        Create
      </button>
      {pets.map((pet: any) => {
        return <Card pet={pet} />;
      })}
    </>
  );
};

export default Pets;
