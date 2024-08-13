"use server";

import { action } from "@/utils/zsa";
import { createPetInFirebase, getPetsFromFirebase } from "@/services/firebase/pet/pet_service";
import { inputPetSchema, userIdSchema } from "@/schemas/schemas";
import { convertTimestampsToDates } from "@/utils/convert";
import { getAuthenticatedUserId } from "@/utils/auth";



export const createPet = action.input(inputPetSchema).handler(async ({ input }) => {
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


export const getPetsAction = action.input(userIdSchema).handler(async ({input}) => {
  try {
    const resultFromDb = await getPetsFromFirebase( input.userId);
    const formattedPets = convertTimestampsToDates(resultFromDb, ['birthDate']);
  
    return formattedPets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
});