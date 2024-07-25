
import { WeightForm, WeightChart } from '@/types/Weight';
import { addPetVaccine as addVaccineService, getPetVaccines as getVaccinesService } from '@/services/firebase/pet/vaccine_service';
import { getCurrentUserId } from '@/services/user/user_service';
import useVaccineStore from '@/stores/vaccine-store';
import { VaccineForm } from '@/types/Vaccines';

export const fetchAndSetVaccines = async (userId: string, petId: string) => {
     useVaccineStore.setState({ loading: true, error: null });
  try {
    const vaccinesFromDb = await getVaccinesService(userId, petId);
    useVaccineStore.setState({ vaccines:vaccinesFromDb, loading: false})
  } catch (error) {
    console.error('Error fetching weights:', error);
    useVaccineStore.setState({ error: 'Error fetching weights', loading: false });
  }
};

export const addVaccinesAndUpdateStore = async (petId: string, data: VaccineForm) => {
  const userId = getCurrentUserId();
  try {
     addVaccineService(userId!, petId, data).then(() => {
     fetchAndSetVaccines(userId!, petId);
     });
  } catch (error) {
    console.error('Error adding vaccine and updating store:', error);
  }
};
