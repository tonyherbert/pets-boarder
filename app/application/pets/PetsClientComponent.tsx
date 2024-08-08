"use client";

import { useEffect } from 'react';
import { useMainStore } from '@/stores/main-store';
import usePetStore from '@/stores/pet-store';
import Button from '@/components/button/Button';
import CreatePetForm from '@/components/forms/pet/CreatePetForm';
import SimpleCard from '@/components/simple-card/SimpleCard';
import "./page.scss";
import { Pet } from '@/types/Pets';
import {HoverEffect}  from '@/components/ui/card-hover-effect';

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
    <div className='p-4 w-screen'>
     <div className='max-w-7xl mx-auto px-16 py-4 bg-background border-2 border-zinc-400 rounded-xl flex justify-between items-center'>
  <h1 className="text-3xl font-bold mb-0">My pets</h1>
  <Button className="custom-button" onClick={() => openModal(<CreatePetForm />)}>Add a pet</Button>
</div>
      <div className="max-w-6xl mx-auto px-8">
      <HoverEffect pets={pets} />
      </div>
    </div>
  );
};

export default PetsClientComponent;
