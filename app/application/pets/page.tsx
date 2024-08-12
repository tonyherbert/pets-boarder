import { getPetsAction } from './pets.actions';
import PetsClientComponent from './PetsClientComponent';

export default async function Page() {
  const [pets, error] = await getPetsAction();

  if (error) {
    console.error('Error fetching pets:', error);
    return <div>Error loading pets</div>;
  }

  return <PetsClientComponent initialPets={pets} />;
}
