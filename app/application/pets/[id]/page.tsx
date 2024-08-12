import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WeightTabContentServer from './components/tabs/server/WeightTabContentServer';
import SizeTabContent from './components/tabs/client/SizeTabContent';

interface PageDetailsPetProps {
  params: { id: string };
}

export default function Page({ params }: PageDetailsPetProps) {
  return (
    <Tabs defaultValue="weight" className="w-screen">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weight">Weight</TabsTrigger>
        <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
        <TabsTrigger value="size">Size</TabsTrigger>
      </TabsList>

      <TabsContent value="weight">
        <WeightTabContentServer petId={params.id} />
      </TabsContent>
      <TabsContent value="vaccines">waiting vaccines here...</TabsContent>
      <TabsContent value="size">
        <SizeTabContent />
      </TabsContent>
    </Tabs>
  );
}
