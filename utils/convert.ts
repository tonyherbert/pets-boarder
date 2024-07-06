import { WeightChart, WeightFromFirestore } from "@/types/Weight";

export function SimplifyToWeigthsArray(weights: WeightFromFirestore[]): WeightChart[] {
  return weights.map(weight => ({
    value: weight.weight,
    name: weight.date,
    unit: weight.unit
  }));
}