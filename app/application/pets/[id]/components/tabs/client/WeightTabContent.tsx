'use client';
import React, { useState } from 'react';
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
import { WeightTable } from '../../tables/WeightTable';
import { MenuWeight } from '../../menu/MenuWeight';

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
  const [selectedMenu, setSelectedMenu] = useState<string>('Table');

  if (error) {
    return <div>Error loading weights...</div>;
  }

  const handleMenuItemClick = (item: string) => {
    setSelectedMenu(item);
  };

  return (
    <>
      <MenuWeight onMenuItemClick={handleMenuItemClick} />

      <div className="w-screen mx-auto p-4 max-w-7xl h-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {selectedMenu === 'Table' && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <WeightTable data={weights} />
          </div>
        )}
        {selectedMenu === 'Trend graph' && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <LineChartComponent data={weights} loading={false} />
          </div>
        )}
        {selectedMenu === 'Increase calculator' && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <WeightDifferenceCalculator weights={weights} />
          </div>
        )}
        <Card className="col-span-1 bg-card max-w-full h-full">
          <CardHeader>
            <CardTitle>Add new weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 h-96">
            <CreateWeightForm petId={petId} loading={false} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
