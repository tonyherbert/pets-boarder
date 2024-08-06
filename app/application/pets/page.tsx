
import { use } from 'react';
import { fetchPets } from '@/actions/pets';
import PetsClientComponent from './PetsClientComponent';

export default function PetsPage() {
  const pets = use(fetchPets());  

  return <PetsClientComponent initialPets={pets} />;
}
