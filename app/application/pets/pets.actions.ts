'use server'

import { action, authedAction } from '@/utils/zsa'
import {
    createPetInFirebase,
    deletePetInFirebase,
    getPetsFromFirebase,
} from '@/services/firebase/pet/pet_service'
import { inputPetSchema, userIdSchema } from '@/schemas/schemas'
import { convertTimestampsToDates } from '@/utils/convert'
import { z } from 'zod'

export const createPetAction = authedAction
    .input(inputPetSchema)
    .handler(async ({ input, ctx }) => {
        try {
            const userId = ctx
            if (!userId) {
                throw new Error('No user ID found in context.')
            }
            const petId = await createPetInFirebase(userId, {
                ...input,
            })

            return [petId, null]
        } catch (error) {
            console.error('Error creating pet:', error)
            return [null, error]
        }
    })

export const deletePetAction = authedAction
    .input(z.object({ petId: z.string() }))
    .handler(async ({ input, ctx }) => {
        try {
            const userId = ctx
            if (!userId) {
                throw new Error('No user ID found in context.')
            }
            await deletePetInFirebase(userId, input.petId)

            return 'ok'
        } catch (error) {
            console.error('Error creating pet:', error)
            return [null, error]
        }
    })

export const getPetsAction = authedAction.handler(async ({ ctx }) => {
    try {
        console.log('ctx', ctx)

        const userId = ctx
        if (!userId) {
            throw new Error('No user ID found in context.')
        }

        const resultFromDb = await getPetsFromFirebase(userId)

        const formattedPets = convertTimestampsToDates(resultFromDb, [
            'birthDate',
        ])
        return formattedPets
    } catch (error) {
        console.error('Error fetching pets in getPetsAction:', error)
        return []
    }
})
