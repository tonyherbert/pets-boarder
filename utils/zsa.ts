import { createServerAction, createServerActionProcedure } from 'zsa'
import { fetchTokens } from './tokens'

export const action = createServerAction()

const authedProcedure = createServerActionProcedure().handler(
    async ({ ctx }: any) => {
        try {
            const { userId } = await fetchTokens()
            console.log('userId', userId)

            ctx = userId
            return userId
        } catch {
            throw new Error('User not authenticated')
        }
    }
)

export const authedAction = authedProcedure.createServerAction()
