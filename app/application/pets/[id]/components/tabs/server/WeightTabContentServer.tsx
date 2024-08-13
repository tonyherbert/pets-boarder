import React from 'react';
import { getWeightsAction } from '../../../weight.action';
import WeightTabContent from '../client/WeightTabContent';
import { fetchTokens } from '@/utils/tokens';

interface WeightTabContentServerProps {
  petId: string;
}

export default async function WeightTabContentServer({
  petId,
}: WeightTabContentServerProps) {
  const { userId } = await fetchTokens();
  const [weights, error] = await getWeightsAction({ userId, petId });

  if (error) {
    console.error('Error fetching weights:', error);
    return <div>Error loading weights</div>;
  }
  return <WeightTabContent petId={petId} weights={weights} error={error} />;
}
