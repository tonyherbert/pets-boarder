import React from 'react'
import { getWeightsAction } from '../../../weight.action'
import WeightTabContent from '../client/WeightTabContent'

interface WeightTabContentServerProps {
    petId: string
}

export default async function WeightTabContentServer({
    petId,
}: WeightTabContentServerProps) {
    const [weights, error] = await getWeightsAction({ petId })

    if (error) {
        console.error('Error fetching weights:', error)
        return <div>Error loading weights</div>
    }
    return <WeightTabContent petId={petId} weights={weights} error={error} />
}
