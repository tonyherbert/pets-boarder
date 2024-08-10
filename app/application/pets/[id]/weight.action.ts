"use server";

import { z } from "zod";
import { action } from "@/utils/zsa";
import { getAuthenticatedUserId } from "@/utils/auth";
import { petIdSchema, petSchema, weightSchema } from "@/schemas/schemas";
import { Timestamp } from "firebase/firestore";
import { createWeightInFirebase, getWeightsByPetFromFirebase } from '@/services/firebase/pet/weight_service';
import { Weight } from "@/types/Weight";
import { Value } from "@radix-ui/react-select";
import { convertTimestampsToDates, sortByDate } from "@/utils/convert";

export const createWeightAction = action.input(weightSchema).handler(async ({ input }) => {
  try {
    const userId = await getAuthenticatedUserId();
    const weightId = await createWeightInFirebase(userId, { ...input });
    return [weightId, null];
  } catch (error) {
    console.error("Error creating weight:", error);
    return [null, error];
  }
});

export const getWeightsAction = action.input(petIdSchema).handler(async ({ input }) => {
  try {
    const userId = await getAuthenticatedUserId();
    const resultFromDb = await getWeightsByPetFromFirebase(userId, input.petId);

    const formattedWeights = convertTimestampsToDates(resultFromDb, ['date']);
    const sortedWeights = sortByDate(formattedWeights, "date");

    return formattedWeights;
  } catch (error) {
    console.error("Error fetching weights:", error);
    return [];
  }
});
