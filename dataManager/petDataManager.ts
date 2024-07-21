
import { createPet as createPetService, getPetsByUser as getPetsByUserService, getPetById as getPetByIdService } from '@/services/firebase/pet/pet_service';
import { getCurrentUserId } from '@/services/user/user_service';
import usePetStore from '@/stores/pet-store';
import { PetForm } from '@/types/Pets';

export const fetchAndSetPets = async () => {
     usePetStore.setState({ loading: true, error: null });
  try {
    const PetsFromDb = await getPetsByUserService();
    usePetStore.setState({ pets: PetsFromDb, loading: false})
  } catch (error) {
    console.error('Error fetching weights:', error);
    usePetStore.setState({ error: 'Error fetching weights', loading: false });
  }
};

export const addPetAndUpdateStore = async (petId: string, data: PetForm) => {
  const userId = getCurrentUserId();
  try {
     createPetService(userId!, data).then(() => {
     fetchAndSetPets();
     });
  } catch (error) {
    console.error('Error adding weight and updating store:', error);
  }
};

export const getPetByIdAndUpdateStore = async (id: string) => {
     usePetStore.setState({ loading: true, error: null });
      try {
        const petFromDb = await getPetByIdService(id);
    usePetStore.setState({ selectedPet: petFromDb, loading: false})
      } catch (error) {
        console.error('Error fetching pet by id:', error);
      usePetStore.setState({ error: 'Error fetching pet', loading: false });
      }
    };
