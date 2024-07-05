"use client";
import { useEffect, useState } from "react";
import usePetStore from "@/stores/pet-store";
import { Pet } from "@/types/Pets";
import Card from "@/components/pets/card/card";
import "./page.scss";

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
    <div className="container-pet-details">
      <div className="identity">
        <Card data={pet} />
      </div>
      <div className="vaccines"></div>
      <div className="weight"></div>
      <div className="size"></div>
    </div>
  );
};

export default PetDetail;
