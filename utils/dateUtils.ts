"use server"
import { getWeightsAction } from '@/app/application/pets/[id]/weight.action';
import { Weight } from '@/types/Weight';
import { formatDate } from '@/utils/convert';
import { fetchTokens } from './tokens';

export const isWeightDateAlreadyUsedInWeights = async (petId: string, date: Date): Promise<boolean> => {
  try {
    const { userId } = await fetchTokens();
    const weights = await getWeightsAction({userId, petId });
    return (weights[0] as Weight[]).some(weight => 
      formatDate(weight.date, 'yyyy/MM/dd') === formatDate(date, 'yyyy/MM/dd')
    );
  } catch (error) {
    console.error('Error checking if date exists:', error);
    return false;
  }
};