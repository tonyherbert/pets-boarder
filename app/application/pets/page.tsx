import { getPets } from './pets.actions'; // Assurez-vous que le chemin est correct
import PetsClientComponent from './PetsClientComponent'; // Assurez-vous que le chemin est correct

export default async function PetsPage() {
  const [pets, error] = await getPets();

  if (error) {
    console.error('Error fetching pets:', error);
    return <div>Error loading pets</div>;
  }

  return <PetsClientComponent initialPets={pets} />;
}
