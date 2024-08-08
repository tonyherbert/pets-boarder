'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SizeTabContent from './components/tabs/SizeTabContent';
import VaccinesTabContent from './components/tabs/VaccinesTabContent';
import WeightTabContent from './components/tabs/WeightTabContent';

interface PageDetailsPetProps {
  params: { id: string };
}

export default function PageDetailsPet({ params }: PageDetailsPetProps) {
  const [activeTab, setActiveTab] = useState('weight');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Tabs
      defaultValue="weight"
      className="w-screen"
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weight">Weight</TabsTrigger>
        <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
        <TabsTrigger value="size">Size</TabsTrigger>
      </TabsList>
      <TabsContent value="weight">
        {activeTab === 'weight' && <WeightTabContent petId={params.id} />}
      </TabsContent>
      <TabsContent value="vaccines">
        {activeTab === 'vaccines' && 'waiting vaccines here...'}
      </TabsContent>
      <TabsContent value="size">
        {activeTab === 'size' && <SizeTabContent />}
      </TabsContent>
    </Tabs>
  );
}
