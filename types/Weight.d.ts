export type WeightForm = {
    weight: number;
    unit: string;
    date: string;
};

export type WeightFromFirestore = {
    createdAt: string;
    id: string;
    ownerId: string;
    petId: string;
    weight: number;
    unit: string;
    date: string;
};

export interface WeightChart {
  value: number;
  name: string;
  unit: string;
}