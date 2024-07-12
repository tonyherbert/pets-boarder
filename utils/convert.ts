import { WeightChart, WeightFromFirestore } from "@/types/Weight";

export function SimplifyToWeigthsArray(weights: WeightFromFirestore[]): WeightChart[] {
  const test = weights
    .map(weight => ({
      value: weight.weight,
      name: weight.date,
      unit: weight.unit
    }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    console.log(test);
  return test
}