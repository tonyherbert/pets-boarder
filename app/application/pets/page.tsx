import { Pet } from '@/types/Pets';
import { getPetsAction } from './pets.actions';
import PetsClientComponent from './PetsClientComponent';
import { fetchTokens } from '@/utils/tokens';

async function fetchPets(): Promise<Pet[]> {
  const [pets, error] = await getPetsAction();
 
  if (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
  return pets;
}
export default async function Page() {
  const pets = await fetchPets();

  return <PetsClientComponent initialPets={pets} />;
}
