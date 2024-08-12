"use server";

import { z } from "zod";
import { action } from "@/utils/zsa";
import { fetchTokens } from "@/utils/tokens";
import { createPetInFirebase, getPetsFromFirebase } from "@/services/firebase/pet/pet_service";
import { Pet } from "@/types/Pets";
import { petSchema } from "@/schemas/schemas";
import { convertTimestampsToDates } from "@/utils/convert";
import { getAuthenticatedUserId } from "@/utils/auth";



export const createPet = action.input(petSchema).handler(async ({ input }) => {
  try {
      const userId = await getAuthenticatedUserId();
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
  id: z.string(),          
  ownerId: z.string(),
});


export const getPetsAction = action.handler(async () => {
  try {
       const userId = await getAuthenticatedUserId();
       const resultFromDb = await getPetsFromFirebase(userId);
       const formattedPets = convertTimestampsToDates(resultFromDb, ['birthDate']);
  
    return formattedPets;
  } catch (error) {
    console.error("Error fetching weights:", error);
    return [];
  }
});