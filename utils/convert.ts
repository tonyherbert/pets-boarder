import { Weight, WeightChart, WeightFromFirestore } from "@/types/Weight";
import moment from 'moment'; // Importez Moment.js


export function addMonthsToDate(dateString: string, monthsToAdd: number): string {
  const momentDate = moment(dateString); // Crée un objet Moment à partir de la date
  momentDate.add(monthsToAdd, 'months'); // Ajoute le nombre de mois spécifiés
  return momentDate.format('YYYY-MM-DD'); // Formate la date au format souhaité
}

/**
 * Trie un tableau d'objets par une propriété de type date du plus ancien au plus récent.
 * @param {Array} items - Le tableau d'objets à trier.
 * @param {string} dateProperty - Le nom de la propriété contenant la date.
 * @returns {Array} - Le tableau trié d'objets.
 * @throws {Error} - Si une date invalide est trouvée dans les objets.
 */
export function sortByDate<T>(items: T[], dateProperty: keyof T): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a[dateProperty] as unknown as string);
    const dateB = new Date(b[dateProperty] as unknown as string);
    
    // Assurez-vous que dateA et dateB sont des objets Date valides
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      throw new Error('Format de date invalide dans les objets');
    }

    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Calcule la différence en pourcentage entre les valeurs les plus anciennes et les plus récentes d'une propriété donnée.
 * @param {Array} items - Le tableau d'objets à analyser.
 * @param {string} dateProperty - Le nom de la propriété contenant la date.
 * @param {string} valueProperty - Le nom de la propriété contenant la valeur à comparer.
 * @returns {object} - Un objet contenant la date la plus ancienne, la date la plus récente, et la différence en pourcentage des valeurs.
 */
export function calculatePercentageDifference<T>(
  items: T[],
  dateProperty: keyof T,
  valueProperty: keyof T
): { oldestDate: string; mostRecentDate: string; percentageDifference: number } | undefined {
  if (items.length === 0) return;

  // Trier les objets par date
  const sortedItems = sortByDate(items, dateProperty);

  // Obtenir les objets les plus anciens et les plus récents
  const oldest = sortedItems[0];
  const mostRecent = sortedItems[sortedItems.length - 1];

  // Calculer la différence en valeur
  const valueOldest = (oldest[valueProperty] as unknown as number);
  const valueMostRecent = (mostRecent[valueProperty] as unknown as number);

  if (valueOldest === 0) {
    throw new Error('La valeur de base (ancienne) ne peut pas être zéro pour calculer une différence en pourcentage.');
  }

  const valueDifference = valueMostRecent - valueOldest;
  const percentageDifference = (valueDifference / valueOldest) * 100;

  return {
    oldestDate: oldest[dateProperty] as unknown as string,
    mostRecentDate: mostRecent[dateProperty] as unknown as string,
    percentageDifference
  };
}
