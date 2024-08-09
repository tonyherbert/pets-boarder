"use server";

import { z } from "zod";
import { action } from "@/utils/zsa";
import { fetchTokens } from "@/utils/tokens";
import { createPetInFirebase, getPetsFromFirebase } from "@/services/firebase/pet/pet_service";
import { Pet } from "@/types/Pets";
import { petSchema } from "@/schemas/schemas";



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

type GetPetsResponse = [Pet[], null] | [[], any];

export const getPets = async (): Promise<GetPetsResponse> => {
  try {
    const { userId } = await fetchTokens();
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    // Récupérer les animaux de Firebase
    const pets = await getPetsFromFirebase(userId);

    // Valider et transformer les données récupérées
    const validatedPets = pets.map((pet) => {
      try {
        return extendedPetSchema.parse(pet);
      } catch (error) {
        console.error("Validation failed for pet:", pet, error);
        return null; 
      }
    }).filter((pet): pet is Pet => pet !== null); // Filtrer les éléments invalides

    return [validatedPets, null];
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [[], error];
  }
};