"use server";

import { z } from "zod";
import { action } from "@/utils/zsa";
import { fetchTokens } from "@/utils/tokens";
import { Pet } from "@/types/Pets";
import { petSchema, weightSchema } from "@/schemas/schemas";
import { Timestamp } from "firebase/firestore";
import { createWeightInFirebase, getWeightsByPetFromFirebase } from '@/services/firebase/pet/weight_service';
import { Weight } from "@/types/Weight";
import { Value } from "@radix-ui/react-select";
import { convertTimestampsToDates, sortByDate } from "@/utils/convert";



export const createWeightAction = action.input(weightSchema).handler(async ({ input }) => {
  try {
    const { userId } = await fetchTokens();
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    const weightId = await createWeightInFirebase(userId, {
      ...input,
    });
    
    return [weightId, null];
  } catch (error) {
    console.error("Error creating pet:", error);
    return [null, error];
  }
});
  
export const getWeightsAction = action.input(
  z.object({
    petId: z.string(),
  })
)
.handler(async ({ input }) => {
  try {
    const { userId } = await fetchTokens();
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    const weights = await getWeightsByPetFromFirebase(userId, input.petId);

    const validatedWeights = convertTimestampsToDates(weights, ['date']);
    console.log();
    
    const sortedWeights = sortByDate(validatedWeights, "date");

    return sortedWeights;
  } catch (error) {
    console.error("Error fetching weights:", error);
    return [];
  }
});