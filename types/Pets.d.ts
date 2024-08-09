export type PetForm = {
  id: string;
  name: string;
  race: string;
  chipNumber: string;
  lof: string;
  animalType: string;
  breed: string;
  birthDate: string;
  gender: string;
};

export type Pet = {
  id: string;
  name: string;
  race: string;
  chipNumber: string;
  lof: string;
  animalType: string;
  breed: string;
  birthDate: string;
  ownerId: string;
  gender: string;
};

export type Pets = Pet[];
