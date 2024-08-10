export type Weight = {
    createdAt: string;
    id: string;
    ownerId: string;
    petId: string;
    weight: string;
    unit: string;
    date: date;
};

export type WeightFromFirestore = {
 
};

export interface WeightChart {
  value: number;
  name: string;
  unit: string;
}

export interface WeightForm {
  weight: string; // Le poids est représenté comme une chaîne de caractères
  unit: 'kgs' | 'lbs'; // L'unité est soit 'kgs' ou 'lbs'
  date?: string; // La date est optionnelle et peut être un objet Date ou undefined
}