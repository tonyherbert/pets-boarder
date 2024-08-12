'use client';

import React from 'react';
import CreateWeightForm from '@/components/forms/pet/CreateWeightForm';
import LineChartComponent from '@/components/lineChart/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Weight } from '@/types/Weight';
import WeightDifferenceCalculator from '../../WeightDifferenceCalculator';

interface WeightTabContentProps {
  petId: string;
  weights: Weight[];
  error: any;
}

export default function WeightTabContent({
  petId,
  weights,
  error,
}: WeightTabContentProps) {
  if (error) {
    return <div>Error loading weights...</div>;
  }

  return (
    <div className="w-screen mx-auto p-4 max-w-7xl h-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <LineChartComponent data={weights} loading={false} />
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
                <CreateWeightForm petId={petId} loading={false} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="weight-difference-calculator">
              <AccordionTrigger>Weight Difference Calculator</AccordionTrigger>
              <AccordionContent>
                <WeightDifferenceCalculator weights={weights} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
