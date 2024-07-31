// "use client";
// import { useEffect } from 'react';
// import PetsClientComponent from './PetsClientComponent';
// import usePetStore from '@/stores/pet-store';


// export default function PetsPage() {
//   const { actions, pets, loading, error } = usePetStore();

//   useEffect(() => {
//     actions.fetchPets();
//   }, [actions]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return <PetsClientComponent initialPets={pets} />;
// }
import { use } from 'react';
import { fetchPets } from '@/actions/pets';
import PetsClientComponent from './PetsClientComponent';

export default function PetsPage() {
  const pets = use(fetchPets());  

  return <PetsClientComponent initialPets={pets} />;
}
