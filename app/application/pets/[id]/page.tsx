import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import WeightTabContentServer from './components/tabs/server/WeightTabContentServer'
import SizeTabContent from './components/tabs/client/SizeTabContent'
import { IconArrowLeft, IconWeight } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/LucideIcon'

interface PageDetailsPetProps {
    params: { id: string }
}
export default function Page({ params }: PageDetailsPetProps) {
    return (
        <div className="overflow-x-hidden sticky ">
            <Button className="bg-transparent hover:bg-transparent dark:text-primary mt-8 ml-4 gap-4">
                <IconArrowLeft className=" text-foreground dark:text-primary h-5 w-5 flex-shrink-0" />
                Back to pets
            </Button>
            <div className="max-w-8xl mr-auto px-8 md:px-16 md:mx-2 ">
                <h1>detailed view of Tago</h1>
                <Tabs defaultValue="weight" className="w-full">
                    <TabsList className=" inline-block  w-full grid-cols-3">
                        <TabsTrigger className="gap-2" value="weight">
                            <Icon name="weight" />
                            Weight
                        </TabsTrigger>
                        <TabsTrigger className="gap-2" value="vaccines">
                            <Icon name="syringe" />
                            Vaccines
                        </TabsTrigger>
                        <TabsTrigger className="gap-2" value="size">
                            <Icon name="ruler" />
                            Size
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="weight">
                        <WeightTabContentServer petId={params.id} />
                    </TabsContent>
                    <TabsContent value="vaccines">
                        waiting vaccines here...
                    </TabsContent>
                    <TabsContent value="size">
                        <SizeTabContent />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
