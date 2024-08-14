import moment from 'moment'; // Importez Moment.js
import { format } from 'date-fns';
import { Timestamp } from "firebase/firestore";

export function addMonthsToDate(dateString: string, monthsToAdd: number): string {
  const momentDate = moment(dateString); // Crée un objet Moment à partir de la date
  momentDate.add(monthsToAdd, 'months'); // Ajoute le nombre de mois spécifiés
  return momentDate.format('YYYY-MM-DD'); // Formate la date au format souhaité
}

/**
 * Trie un tableau d'objets par une propriété de type date du plus ancien au plus récent.
 * @param {T[]} items - Le tableau d'objets à trier.
 * @param {keyof T} dateProperty - Le nom de la propriété contenant la date. 
 *                                 Cette propriété peut être une chaîne de caractères au format ISO.
 * @returns {T[]} - Le tableau trié d'objets, du plus ancien au plus récent.
 * @throws {Error} - Si une date invalide est trouvée dans les objets ou si un objet n'a pas la propriété de date.
 */
export function sortByDate<T>(items: T[], dateProperty: keyof T): T[] {  
  return items.sort((a, b) => {
    // Vérifiez que les objets ne sont pas null ou undefined
    if (a == null || b == null) {
      throw new Error('Un des objets est null ou undefined');
    }

    // Assurez-vous que les propriétés sont définies
    const dateA = a[dateProperty];
    const dateB = b[dateProperty];

    if (dateA == null || dateB == null) {
      throw new Error(`Un des objets ne possède pas la propriété '${String(dateProperty)}'`);
    }

    // Convertir en objets Date si la propriété est une chaîne ISO
    const dateAObject = typeof dateA === 'string' ? new Date(dateA) : dateA;
    const dateBObject = typeof dateB === 'string' ? new Date(dateB) : dateB;

    if (!(dateAObject instanceof Date) || isNaN(dateAObject.getTime()) ||
        !(dateBObject instanceof Date) || isNaN(dateBObject.getTime())) {
      throw new Error('Format de date invalide dans les objets');
    }

    return dateAObject.getTime() - dateBObject.getTime();
  });
}


/**
 * Calcule la différence en pourcentage entre la valeur la plus ancienne et la plus récente dans un tableau d'objets.
 * @param {T[]} items - Le tableau d'objets à analyser.
 * @param {keyof T} dateProperty - Le nom de la propriété contenant la date.
 * @param {keyof T} valueProperty - Le nom de la propriété contenant la valeur à comparer.
 * @returns {{ oldestDate: string; mostRecentDate: string; percentageDifference: number } | undefined} - Un objet contenant la date la plus ancienne, la date la plus récente, et la différence en pourcentage des valeurs.
 * @throws {Error} - Si les objets ne sont pas valides ou si une valeur de départ est zéro.
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

  // Vérifier que les objets sont valides
  if (!oldest || !mostRecent) {
    throw new Error('Les objets les plus anciens ou les plus récents sont manquants.');
  }

  // Vérifier que les propriétés de date et de valeur existent et sont définies
  const oldestDate = oldest[dateProperty];
  const mostRecentDate = mostRecent[dateProperty];
  const valueOldest = Number(oldest[valueProperty]);
  const valueMostRecent = Number(mostRecent[valueProperty]);

  if (oldestDate === undefined || mostRecentDate === undefined) {
    throw new Error('Les propriétés de date spécifiées sont manquantes dans les objets.');
  }

  if (isNaN(valueOldest) || isNaN(valueMostRecent)) {
    throw new Error('Les valeurs spécifiées doivent être des nombres valides.');
  }

  if (valueOldest === 0) {
    throw new Error('La valeur de base (ancienne) ne peut pas être zéro pour calculer une différence en pourcentage.');
  }

  // Calculer la différence en pourcentage
  const valueDifference = valueMostRecent - valueOldest;
  const percentageDifference = (valueDifference / valueOldest) * 100;

  return {
    oldestDate: oldestDate!.toString(),
    mostRecentDate: mostRecentDate!.toString(),
    percentageDifference
  };
}



/**
 * Calcule la différence en pourcentage entre les valeurs à deux dates spécifiques.
 * @param {T[]} items - Le tableau d'objets à analyser.
 * @param {Date} startDate - La date de début en tant qu'objet Date.
 * @param {Date} endDate - La date de fin en tant qu'objet Date.
 * @param {keyof T} dateProperty - Le nom de la propriété contenant la date.
 * @param {keyof T} valueProperty - Le nom de la propriété contenant la valeur à comparer.
 * @returns {{ startDate: Date; endDate: Date; percentageDifference: number } | undefined} - Un objet contenant la date de début, la date de fin, et la différence en pourcentage des valeurs.
 */
export function calculatePercentageDifferenceBetweenDates<T>(
  items: T[],
  startDate: Date,
  endDate: Date,
  dateProperty: keyof T,
  valueProperty: keyof T
): { startDate: Date; endDate: Date; percentageDifference: number } | undefined {
  if (items.length === 0) return;
console.log('stzrt', startDate);

  // Trouver les objets correspondant aux dates de début et de fin
  const startItem = items.find(item => (item[dateProperty] as unknown as Date).getTime() === startDate.getTime());
  const endItem = items.find(item => (item[dateProperty] as unknown as Date).getTime() === endDate.getTime());

  if (!startItem || !endItem) {
    throw new Error('Les dates spécifiées ne sont pas toutes présentes dans les données.');
  }

  // Obtenir les valeurs des objets
  const valueStart = Number(startItem[valueProperty]);
  const valueEnd = Number(endItem[valueProperty]);

  if (isNaN(valueStart) || isNaN(valueEnd)) {
    throw new Error('Les valeurs spécifiées doivent être des nombres valides.');
  }

  if (valueStart === 0) {
    throw new Error('La valeur de départ (poids initial) ne peut pas être zéro pour calculer une variation en pourcentage.');
  }

  // Calculer la différence en pourcentage
  const valueDifference = valueEnd - valueStart;
  const percentageDifference = (valueDifference / valueStart) * 100;

  return {
    startDate,
    endDate,
    percentageDifference
  };
}


/**
 * Format a date to a specific string format.
 * @param date - The date to format, can be a string, Date object, or Timestamp.
 * @param dateFormat - The format string to use, default is 'yyyy-MM-dd'.
 * @returns The formatted date string.
 */
export function formatDate(date: string | Date | Timestamp, dateFormat: string = 'dd-MM-yyyy'): string {
  // Convert Timestamp to Date if necessary
  const dateObj = date instanceof Timestamp ? date.toDate() : new Date(date);

  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return format(dateObj, dateFormat);
}

// Définir une interface avec des propriétés qui peuvent être des Timestamp
interface TimestampConvertible {
  [key: string]: Timestamp | any; // Ajustez selon vos besoins
}

// Type guard pour vérifier si une valeur est un Timestamp
function isTimestamp(value: any): value is Timestamp {
  return value instanceof Timestamp;
}

// Fonction générique pour convertir les timestamps en dates
export function convertTimestampsToDates<T extends TimestampConvertible>(
  items: T[],
  timestampFields: (keyof T)[]
): T[] {
  return items
    .map((item) => {
      try {
        // Création d'un nouvel objet avec les champs convertis
        const convertedItem = { ...item } as T;

        // Parcours des champs spécifiés pour conversion
        timestampFields.forEach((field) => {
          const value = convertedItem[field];
          if (isTimestamp(value)) {
            // On est sûr que value est un Timestamp ici
            const date = moment(value.toDate()).startOf('day').toDate();
            convertedItem[field] = date as T[keyof T];
          }
        });

        return convertedItem;
      } catch (error) {
        console.error('Conversion failed for item:', item, error);
        return null; // Renvoi de null en cas d'erreur
      }
    })
    .filter((item): item is T => item !== null); // Filtrer les éléments null
}


// Utilisez cette fonction pour normaliser la date à minuit et ignorer l'heure
export const normalizeDate = (date: string) => {
  return moment(date, 'DD/MM/YYYY').startOf('day').toDate();
};