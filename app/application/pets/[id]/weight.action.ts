"use server";

import { action } from "@/utils/zsa";
import { getAuthenticatedUserId } from "@/utils/auth";
import { inputGetWeightSchema, inputWeightSchema } from "@/schemas/schemas";
import { createWeightInFirebase, getWeightsByPetFromFirebase } from '@/services/firebase/pet/weight_service';
import { convertTimestampsToDates, sortByDate } from "@/utils/convert";

export const createWeightAction = action.input(inputWeightSchema).handler(async ({ input }) => {
  try {
    const userId = await getAuthenticatedUserId();
    const weightId = await createWeightInFirebase(userId, { ...input });
    return [weightId, null];
  } catch (error) {
    console.error("Error creating weight:", error);
    return [null, error];
  }
});

export const getWeightsAction = action.input(inputGetWeightSchema).handler(async ({ input }) => {
  try {
    const resultFromDb = await getWeightsByPetFromFirebase(input.userId, input.petId);

    const formattedWeights = convertTimestampsToDates(resultFromDb, ['date', 'createdAt']);
    const sortedWeights = sortByDate(formattedWeights, "date",);
    return sortedWeights;
  } catch (error) {
    console.error("Error fetching weights:", error);
    return [];
  }
});
