'use client';
import React, { useEffect, useState } from 'react';
import { Pet } from '@/types/Pets';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Button from '@/components/button/Button';
import CreatePetForm from '@/components/forms/pet/CreatePetForm';
import './page.scss';
import { useMainStore } from '@/stores/main-store';

interface PetsClientComponentProps {
  initialPets: Pet[] | null;
}

const PetsClientComponent: React.FC<PetsClientComponentProps> = ({
  initialPets,
}) => {
  const [pets, setPets] = useState<Pet[]>(initialPets || []);

  const { openModal } = useMainStore().actions;

  useEffect(() => {
    if (initialPets) {
      setPets(initialPets);
    }
  }, [initialPets]);

  return (
    <div className="p-4 w-screen">
      <div className="max-w-7xl mx-auto px-16 py-4 bg-background border-2 border-zinc-400 rounded-xl flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-0">My pets</h1>
        <Button
          className="custom-button"
          onClick={() => openModal(<CreatePetForm />)}
        >
          Add a pet
        </Button>
      </div>
      <div className="max-w-6xl mx-auto px-8">
        {initialPets ? <HoverEffect pets={pets} /> : <p>No pets found</p>}
      </div>
    </div>
  );
};

export default PetsClientComponent;
