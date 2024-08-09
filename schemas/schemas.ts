import { z } from "zod";

export const petSchema = z.object({
  animalType: z.string().nonempty(),       // Type d'animal, par exemple "dog"
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"), // Date de naissance au format YYYY-MM-DD
  breed: z.string().nonempty(),            // Race de l'animal, par exemple "fauve"
  chipNumber: z.string().regex(/^\d{3} \d{3} \d{3} \d{3}$/, "Chip number must be in XXX XXX XXX XXX format"), // Numéro de puce
  gender: z.string(),      // Genre de l'animal
  lof: z.string().nonempty(),              // Numéro LOF, par exemple "LOF-431 567 9875"
  name: z.string().nonempty(),             // Nom de l'animal
  // ownerId sera ajouté automatiquement et ne fait pas partie du formulaire
});