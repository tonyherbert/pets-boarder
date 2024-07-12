
import { WeightForm, WeightChart } from '@/types/Weight';
import { addPetWeight as addWeightService, getPetWeights as getWeightsService } from '@/services/firebase/pet/weight_service';
import { getCurrentUserId } from '@/services/user/user_service';
import useWeightStore from '@/stores/weight-store';

export const fetchAndSetWeights = async (userId: string, petId: string) => {
     useWeightStore.setState({ loading: true, error: null });
  try {
    const weightsFromDb = await getWeightsService(userId, petId);
    useWeightStore.setState({ weights:weightsFromDb, loading: false})
  } catch (error) {
    console.error('Error fetching weights:', error);
    useWeightStore.setState({ error: 'Error fetching weights', loading: false });
  }
};

export const addWeightAndUpdateStore = async (petId: string, data: WeightForm) => {
  const userId = getCurrentUserId();
  try {
     addWeightService(userId!, petId, data).then(() => {
             fetchAndSetWeights(userId!, petId);

     });
  } catch (error) {
    console.error('Error adding weight and updating store:', error);
  }
};
