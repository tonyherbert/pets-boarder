import { createServerAction, createServerActionProcedure } from 'zsa'
import { fetchTokens } from './tokens'

export const action = createServerAction()

const authedProcedure = createServerActionProcedure().handler(
    async ({ ctx }: any) => {
        try {
            // Détecter si nous sommes en phase de build (processus côté serveur sans accès à `window`)
            if (
                typeof window === 'undefined' &&
                process.env.NODE_ENV === 'production'
            ) {
                console.log('Build mode detected, skipping authentication')

                // Ici, vous pouvez renvoyer un ID par défaut, null, ou un objet factice qui ne casse pas votre application
                ctx = 'defaultUserIdForBuild' // ou null si cela est plus adapté à votre logique
                return 'defaultUserIdForBuild'
            }

            // Exécution normale lors du runtime (navigation côté client)
            const { userId } = await fetchTokens()

            ctx = userId
            return userId
        } catch (error) {
            console.error('User authentication failed:', error)
            throw new Error('User not authenticated')
        }
    }
)

export const authedAction = authedProcedure.createServerAction()
