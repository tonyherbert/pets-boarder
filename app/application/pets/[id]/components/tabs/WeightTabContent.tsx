import React, { useEffect } from 'react';
import CreateWeightForm from '@/components/forms/pet/CreateWeightForm';
import LineChartComponent from '@/components/lineChart/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useWeightStore from '@/stores/weight-store';
import { Skeleton } from '@/components/ui/skeleton'; // Assurez-vous que vous avez ce composant ou importez-le correctement
import WeightDifferenceCalculator from '../WeightDifferenceCalculator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface WeightTabContentProps {
  petId: string;
}

export default function WeightTabContent({ petId }: WeightTabContentProps) {
  const { weights, loading, actions } = useWeightStore();

  useEffect(() => {
    const fetchPetWeights = async () => {
      try {
        actions.fetchWeights(petId);
      } catch (error) {
        console.error('Error fetching pet weights:', error);
      }
    };

    fetchPetWeights();
  }, [petId]);

  if (loading) {
    return (
      <div className="w-screen mx-auto p-4 max-w-7xl h-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Skeleton className="w-full h-80" />{' '}
        </div>
        <Card className="col-span-1 bg-card  max-w-full h-full">
          <CardHeader>
            <CardTitle>Weight Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 h-96">
            <Skeleton className="w-full h-full" />{' '}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-screen mx-auto p-4 max-w-7xl h-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <LineChartComponent data={weights} loading={loading} />
      </div>
      <Card className="col-span-1 bg-card  max-w-full h-full">
        <CardHeader>
          <CardTitle>Weight Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 h-96">
          <Accordion type="single" collapsible>
            <AccordionItem value="create-weight-form">
              <AccordionTrigger>Add Weight</AccordionTrigger>
              <AccordionContent>
                <CreateWeightForm petId={petId} loading={loading} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="weight-difference-calculator">
              <AccordionTrigger>Weight Difference Calculator</AccordionTrigger>
              <AccordionContent>
                <WeightDifferenceCalculator />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
