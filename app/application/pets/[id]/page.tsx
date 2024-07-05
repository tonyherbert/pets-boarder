"use client";
import { useEffect, useState } from "react";
import usePetStore from "@/stores/pet-store";
import { Pet } from "@/types/Pets";

const PetDetail = ({ params }: { params: { id: string } }) => {
  const [pet, setPet] = useState<Pet | undefined>();
  const { actions } = usePetStore();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const fetchedPet = await actions.getPetById(params.id);
        setPet(fetchedPet);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [params.id, actions]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pet.name}</h1>
      {/* Affichez d'autres informations sur l'animal */}
    </div>
  );
};

export default PetDetail;
