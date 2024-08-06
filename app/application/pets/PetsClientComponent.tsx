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
     <div className='max-w-6xl mx-auto px-16 py-4 bg-zinc-800 border-2 border-neutral-50 rounded-xl flex justify-between items-center'>
  <h1 className="text-3xl font-bold mb-0">My pets</h1>
  <Button className="custom-button" onClick={() => openModal(<CreatePetForm />)}>Add a pet</Button>
</div>
      <div className="max-w-5xl mx-auto px-8">
      <HoverEffect pets={pets} />
      </div>
    </div>
  );
};

export default PetsClientComponent;

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];