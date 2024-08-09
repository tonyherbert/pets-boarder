import { getPets } from './pets.actions'; // Assurez-vous que le chemin est correct
import PetsClientComponent from './PetsClientComponent'; // Assurez-vous que le chemin est correct

export default async function PetsPage() {
  const [pets, error] = await getPets();

  if (error) {
    console.error('Error fetching pets:', error);
    // Gérez l'erreur, par exemple en affichant un message d'erreur
    return <div>Error loading pets</div>;
  }

  // Passez les données de pets à PetsClientComponent
  return <PetsClientComponent initialPets={pets} />;
}
