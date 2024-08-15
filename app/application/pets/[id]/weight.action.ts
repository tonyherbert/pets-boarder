'use server'

import { action, authedAction } from '@/utils/zsa'
import { getAuthenticatedUserId } from '@/utils/auth'
import { inputGetWeightSchema, inputWeightSchema } from '@/schemas/schemas'
import {
    createWeightInFirebase,
    deleteWeightInFirebase,
    getWeightsByPetFromFirebase,
} from '@/services/firebase/pet/weight_service'
import { convertTimestampsToDates, sortByDate } from '@/utils/convert'
import { z } from 'zod'

export const createWeightAction = authedAction
    .input(inputWeightSchema)
    .handler(async ({ input, ctx }) => {
        try {
            const userId = ctx
            if (!userId) {
                throw new Error('No user ID found in context.')
            }
            const weightId = await createWeightInFirebase(userId, { ...input })
            return [weightId, null]
        } catch (error) {
            console.error('Error creating weight:', error)
            return [null, error]
        }
    })

export const deleteWeightAction = authedAction
    .input(z.object({ weightId: z.string(), petId: z.string() }))
    .handler(async ({ input, ctx }) => {
        try {
            const userId = ctx
            if (!userId) {
                throw new Error('No user ID found in context.')
            }
            await deleteWeightInFirebase(input.weightId, input.petId, userId)

            return 'ok'
        } catch (error) {
            console.error('Error creating pet:', error)
            return [null, error]
        }
    })

export const getWeightsAction = authedAction
    .input(inputGetWeightSchema)
    .handler(async ({ input, ctx }) => {
        try {
            const userId = ctx
            if (!userId) {
                throw new Error('No user ID found in context.')
            }
            const resultFromDb = await getWeightsByPetFromFirebase(
                userId,
                input.petId
            )

            const formattedWeights = convertTimestampsToDates(resultFromDb, [
                'date',
                'createdAt',
            ])
            const sortedWeights = sortByDate(formattedWeights, 'date')
            return sortedWeights
        } catch (error) {
            console.error('Error fetching weights:', error)
            return []
        }
    })
