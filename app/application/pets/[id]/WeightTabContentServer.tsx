import React from 'react';
import WeightTabContent from './components/tabs/WeightTabContent';
import { getWeightsAction } from './weight.action';

interface WeightTabContentServerProps {
  petId: string;
}

export default async function WeightTabContentServer({
  petId,
}: WeightTabContentServerProps) {
  const [weights, error] = await getWeightsAction({ petId });

  if (error) {
    console.error('Error fetching weights:', error);
    return <div>Error loading weights</div>;
  }
  return <WeightTabContent petId={petId} weights={weights} error={error} />;
}
