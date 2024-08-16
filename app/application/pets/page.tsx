'use client'
import React, { useEffect, useState } from 'react'
import { Pet } from '@/types/Pets'
import CreatePetForm from '@/components/forms/pet/CreatePetForm'
import './page.scss'
import { useMainStore } from '@/stores/main-store'
import loadable from '@loadable/component'
import { Button } from '@/components/ui/button'
import { useServerAction } from 'zsa-react'
import { getPetsAction } from './pets.actions'
import { useServerActionMutation, useServerActionQuery } from '@/lib/zsa.query'

const HoverEffect = loadable(
    () => import('@/components/ui/card-hover-effect'),
    {
        fallback: <div>Loading...</div>,
    }
)

const PetsClientComponent: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([])

    const { openModal } = useMainStore().actions

    const { data, execute } = useServerAction(getPetsAction)
    useEffect(() => {
        execute()
    }, [])

    return (
        <div className="p-4 w-screen">
            <div className="max-w-7xl mx-auto px-16 py-4 bg-background border-2 border-zinc-400 rounded-xl flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-0">My pets</h1>
                <Button
                    className="custom-button"
                    onClick={() => openModal(<CreatePetForm />)}
                >
                    Add a pet
                </Button>
            </div>
            <div className="max-w-6xl mx-auto px-8">
                {data ? <HoverEffect pets={data} /> : <p>No pets found</p>}
            </div>
        </div>
    )
}

export default PetsClientComponent
