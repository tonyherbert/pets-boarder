"use client";
import Card from "@/components/pets/card/card";
import { getPetsByUser } from "@/services/pet/pet_service";
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

  console.log("pets", pets);

  return loading ? (
    <div>Loading...</div>
  ) : (
    pets.map((pet: any) => {
      return <Card pet={pet} />;
    })
  );
};

export default Pets;
