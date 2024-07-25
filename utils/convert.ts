import { WeightChart, WeightFromFirestore } from "@/types/Weight";
import moment from 'moment'; // Importez Moment.js


interface DateObject {
  value: number;
  date: string;
}

export function SimplifyToWeigthsArray(weights: WeightFromFirestore[]): WeightChart[] {
  const test = weights
    .map(weight => ({
      value: weight.weight,
      name: weight.date,
      unit: weight.unit
    }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  return test
}

export function addMonthsToDate(dateString: string, monthsToAdd: number): string {
  const momentDate = moment(dateString); // Crée un objet Moment à partir de la date
  momentDate.add(monthsToAdd, 'months'); // Ajoute le nombre de mois spécifiés
  return momentDate.format('YYYY-MM-DD'); // Formate la date au format souhaité
}