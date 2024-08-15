'use client'
import loadable from '@loadable/component'
import React, { useState, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Weight } from '@/types/Weight'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import LucideIcon from '@/components/ui/LucideIcon'

// Chargement dynamique des composants avec loadable
const WeightTable = loadable(() => import('../../tables/WeightTable'))
const LineChartComponent = loadable(
    () => import('@/views/weightChart/ViewChart')
)
const WeightDifferenceCalculator = loadable(
    () => import('../../WeightDifferenceCalculator')
)
const CreateWeightForm = loadable(
    () => import('@/components/forms/pet/CreateWeightForm')
)
const MenuWeight = loadable(() => import('../../menu/MenuWeight'))

interface WeightTabContentProps {
    petId: string
    weights: Weight[]
    error: any
}

const WeightTabContent = ({ petId, weights, error }: WeightTabContentProps) => {
    const [selectedMenu, setSelectedMenu] = useState('Table')

    const handleMenuItemClick = (menuItem: string) => {
        if (selectedMenu !== menuItem) {
            setSelectedMenu(menuItem)
        }
    }

    return (
        <div>
            <ToggleGroup
                className="justify-end"
                type="single"
                value={selectedMenu}
                onValueChange={handleMenuItemClick}
            >
                <ToggleGroupItem
                    value="Table"
                    disabled={selectedMenu === 'Table'}
                >
                    <LucideIcon name="table" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="Trend graph"
                    disabled={selectedMenu === 'Trend graph'}
                >
                    <LucideIcon name="chart-line" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="Increase calculator"
                    disabled={selectedMenu === 'Increase calculator'}
                >
                    <LucideIcon name="calculator" />
                </ToggleGroupItem>
            </ToggleGroup>

            <div>
                {selectedMenu === 'Table' && (
                    <Suspense fallback={<div>Loading table...</div>}>
                        <WeightTable data={weights} />
                    </Suspense>
                )}
                {selectedMenu === 'Trend graph' && (
                    <div className="max-w-4xl px-16 pt-0 mx-auto">
                        <Suspense fallback={<div>Loading graph...</div>}>
                            <LineChartComponent
                                data={weights}
                                loading={false}
                            />
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
            </div>
        </div>
    )
}

export default WeightTabContent
