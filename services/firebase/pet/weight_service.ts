import { Weight, WeightForm, WeightFromFirestore } from '@/types/Weight'
import { db } from '../../../firebase/firebase'
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
} from 'firebase/firestore'
import { inputWeightSchema } from '@/schemas/schemas'
import { z } from 'zod'

export async function createWeightInFirebase(
    userId: string,
    weightData: z.infer<typeof inputWeightSchema>
): Promise<string> {
    const weightsCollection = collection(db, 'weight')
    const weightDocRef = await addDoc(weightsCollection, {
        ...weightData,
        ownerId: userId,
        createdAt: new Date(),
    })
    return weightDocRef.id
}

export async function getWeightsByPetFromFirebase(
    userId: string,
    petId: string
): Promise<Weight[]> {
    const weightsCollection = collection(db, 'weight')
    const q = query(
        weightsCollection,
        where('ownerId', '==', userId),
        where('petId', '==', petId)
    )
    const querySnapshot = await getDocs(q)

    const weights: Weight[] = []
    querySnapshot.forEach((doc) => {
        weights.push({ id: doc.id, ...doc.data() } as any)
    })
    return weights
}

export async function updatePetWeight(
    weightId: string,
    newWeightData: any
): Promise<void> {
    const weightDocRef = doc(db, 'weight', weightId)
    await updateDoc(weightDocRef, {
        weight: newWeightData,
        date: new Date(),
    })
}

export async function deleteWeightInFirebase(
    weightId: string,
    petId: string,
    userId: string
): Promise<void> {
    const weightDocRef = doc(db, 'weight', weightId)
    const petSnapshot = await getDoc(weightDocRef)

    if (!petSnapshot.exists() || petSnapshot.data()?.ownerId !== userId) {
        throw new Error(`Weight with id: ${petId} does not belong to the user.`)
    }
    await deleteDoc(weightDocRef)
}
