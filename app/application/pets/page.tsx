import { Pet } from '@/types/Pets';
import { getPetsAction } from './pets.actions';
import PetsClientComponent from './PetsClientComponent';
import { fetchTokens } from '@/utils/tokens';

async function fetchPets(): Promise<Pet[]> {
  const { userId } = await fetchTokens();
  const [pets, error] = await getPetsAction({ userId });

  if (error) {
    throw new Error('Erreur lors de la récupération des animaux');
  }
  return pets;
}
export default async function Page() {
  const pets = await fetchPets();

  return <PetsClientComponent initialPets={pets} />;
}
