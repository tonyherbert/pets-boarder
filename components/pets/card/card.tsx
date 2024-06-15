import React from "react";

interface AnimalCardProps {
  chipNumber: string;
  lof: string;
  animalType: string;
  breed: string;
  name: string;
  birthDate: string;
  gender: string;
}
interface Pet {
  pet: AnimalCardProps;
}

const Card: React.FC<Pet> = ({ pet }) => {
  console.log("PET", pet);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
        <p className="text-gray-700">Chip Number: {pet.chipNumber}</p>
        <p className="text-gray-700">LOF: {pet.lof}</p>
        <p className="text-gray-700">Type: {pet.animalType}</p>
        <p className="text-gray-700">Breed: {pet.breed}</p>
        <p className="text-gray-700">Birth Date: {pet.birthDate}</p>
        <p className="text-gray-700">Gender:{pet.gender}</p>
      </div>
    </div>
  );
};

export default Card;
