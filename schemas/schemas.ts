import { z } from "zod";

export const petSchema = z.object({
  animalType: z.string(),       // Type d'animal, par exemple "dog"
  birthDate: z.date().or(z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).transform(val => new Date(val))),  // Date de naissance au format Date
  breed: z.string(),            // Race de l'animal, par exemple "fauve"
  chipNumber: z.string().regex(/^\d{3} \d{3} \d{3} \d{3}$/, "Chip number must be in XXX XXX XXX XXX format"), // Numéro de puce
  gender: z.string(),      // Genre de l'animal
  lof: z.string(),              // Numéro LOF, par exemple "LOF-431 567 9875"
  name: z.string(),             // Nom de l'animal
  // ownerId sera ajouté automatiquement et ne fait pas partie du formulaire
});

export const weightSchema = z.object({
   date: z.date().or(z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).transform(val => new Date(val))),
   petId: z.string(),
   unit: z.string(),
   weight: z.string(),

});