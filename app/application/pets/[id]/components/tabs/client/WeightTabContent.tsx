'use client';
import loadable from '@loadable/component';
import React, { useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Weight } from '@/types/Weight';

// Chargement dynamique des composants avec loadable
const WeightTable = loadable(() => import('../../tables/WeightTable'));
const LineChartComponent = loadable(() => import('@/views/weightChart/ViewChart'));
const WeightDifferenceCalculator = loadable(() => import('../../WeightDifferenceCalculator'));
const CreateWeightForm = loadable(() => import('@/components/forms/pet/CreateWeightForm'));
const MenuWeight = loadable(() => import('../../menu/MenuWeight'));

interface WeightTabContentProps {
  petId: string;
  weights: Weight[];
  error: any;
} 
const WeightTabContent = ({
  petId,
  weights,
  error,
}: WeightTabContentProps)  => {
  const [selectedMenu, setSelectedMenu] = useState('Table');

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenu(menuItem);
  };

  return (
    <div>
      <Suspense fallback={<div>Loading menu...</div>}>
        <MenuWeight onMenuItemClick={handleMenuItemClick} />
      </Suspense>

      <div className="w-screen mx-auto p-4 max-w-7xl h-full gap-4 grid grid-cols-1 md:grid-cols-3 ">
        {selectedMenu === 'Table' && (
          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<div>Loading table...</div>}>
              <WeightTable data={weights} />
            </Suspense>
          </div>
        )}
        {selectedMenu === 'Trend graph' && (
          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<div>Loading graph...</div>}>
              <LineChartComponent data={weights} loading={false} />
            </Suspense>
          </div>
        )}
        {selectedMenu === 'Increase calculator' && (
          <div className="col-span-3">
            <Suspense fallback={<div>Loading calculator...</div>}>
              <WeightDifferenceCalculator weights={weights} />
            </Suspense>
          </div>
        )}
         {selectedMenu !== 'Increase calculator' && 
        <Card className="col-span-1 bg-card max-w-full h-full">
          <CardHeader>
            <CardTitle>Add new weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 h-96">
            <Suspense fallback={<div>Loading form...</div>}>
              <CreateWeightForm petId={petId} loading={false} />
            </Suspense>
          </CardContent>
        </Card>
}
      </div>
    </div>
  );
};

export default WeightTabContent;
