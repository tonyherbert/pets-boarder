"use client";
import Button from "@/components/button/Button";
import CreatePetForm from "@/components/forms/pet/CreatePetForm";
import SimplCard from "@/components/simple-card/SimpleCard";
import { fetchAndSetPets } from "@/dataManager/petDataManager";
import { useMainStore } from "@/stores/main-store";
import usePetStore from "@/stores/pet-store";
import { useEffect } from "react";
import "./page.scss"

const Pets = () => {
    const { pets } = usePetStore();
    const { openModal } = useMainStore().actions;
 useEffect(() => {
    const fetchPet = async () => {
      try {
        fetchAndSetPets();
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };
    fetchPet();
  }, [pets]);

    return <>
        <h1>Pets</h1>
        <Button className="button" onClick={() => openModal(<CreatePetForm />)}> Add a pet</Button>
        <div className="grid-container">
        {pets.map((pet) => (
            <SimplCard key={pet.id} data={pet} />
        ))}
        </div>

    </>;
};
export default Pets;