"use client";

import { useEffect } from 'react';
import { useMainStore } from '@/stores/main-store';
import usePetStore from '@/stores/pet-store';
import Button from '@/components/button/Button';
import CreatePetForm from '@/components/forms/pet/CreatePetForm';
import SimpleCard from '@/components/simple-card/SimpleCard';
import "./page.scss";
import { Pet } from '@/types/Pets';

interface PetsClientComponentProps {
  initialPets: Pet[];
}

const PetsClientComponent: React.FC<PetsClientComponentProps> = ({ initialPets }) => {
  const { pets, actions } = usePetStore();
  const { openModal } = useMainStore().actions;

  useEffect(() => {
    actions.setPets(initialPets);
  }, [initialPets, actions]);

  return (
    <>
      <h1>Pets</h1>
      <Button className="button" onClick={() => openModal(<CreatePetForm />)}>Add a pet</Button>
      <div className="grid-container">
        {pets.map((pet) => (
          <SimpleCard key={pet.id} data={pet} />
        ))}
      </div>
    </>
  );
};

export default PetsClientComponent;
