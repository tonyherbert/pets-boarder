"use server";

import { z } from "zod";
import { action } from "@/utils/zsa";
import { fetchTokens } from "@/utils/tokens";
import { createPetInFirebase, getPetsFromFirebase } from "@/services/firebase/pet/pet_service";
import { Pet } from "@/types/Pets";
import { petSchema } from "@/schemas/schemas";
import { Timestamp } from "firebase/firestore";
import { convertTimestampsToDates } from "@/utils/convert";



export const createPet = action.input(petSchema).handler(async ({ input }) => {
  try {
    const { userId } = await fetchTokens();
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    const petId = await createPetInFirebase(userId, {
      ...input,
    });
    return [petId, null];
  } catch (error) {
    console.error("Error creating pet:", error);
    return [null, error];
  }
});

const extendedPetSchema = petSchema.extend({
  id: z.string(),          // Ajoute l'ID de l'animal
  ownerId: z.string(),     // Ajoute l'ID du propriétaire
});

export const getPets = async (): Promise<[Pet[], Error | null]> => {
  try {
    const { userId } = await fetchTokens();
    if (!userId) {
      throw new Error('User is not authenticated');
    }
    const pets = await getPetsFromFirebase(userId);

       const validatedPets = convertTimestampsToDates(pets, ['birthDate']);


    return [validatedPets, null];
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error('An unknown error occurred');
    console.error('Error fetching pets:', typedError);
    return [[], typedError];
  }
};