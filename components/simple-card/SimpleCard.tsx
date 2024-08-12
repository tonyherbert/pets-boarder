"use client";
import React from "react";
import { Pet } from "@/types/Pets";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "../button/Button";
import { useRouter } from "next/navigation";
import usePetStore from "@/stores/pet-store";

interface CardProps {
  data: Pet;
}

const SimpleCard: React.FC<CardProps> = ({ data }) => {
  const isSmallDevice = useMediaQuery(767);
  const {setSelectedPet} = usePetStore().actions;
  const router = useRouter();

  const handleMoreDetailsClick = (pet: Pet) => {
    setSelectedPet(pet);
    router.push(`pets/${data.id}`);
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-md p-4 text-left h-full">
      <div className="card-header mb-4">
        <h1 className="flex items-center gap-4 text-xl font-medium text-white">
          {data.name}
          {data.gender === "Male" ? <BsGenderMale /> : <BsGenderFemale />}
        </h1>
        <h2 className="text-sm font-bold text-white">{data.race}</h2>
        <span className="text-sm font-medium text-white">{data.birthDate}</span>
        <hr className="my-4" />
      </div>
      <div className="card-content mb-4">
        <div className="animal-identity">
          <p className="grid text-center mb-2 text-sm text-white gap-1">
            <span className="font-bold text-base text-gray-400">Chip number</span>
            {data.chipNumber}
          </p>
          <p className="grid text-center mb-2 text-sm text-white gap-1">
            <span className="font-bold text-base text-gray-400">Lof</span>
            {data.lof}
          </p>
          <p className="grid text-center mb-2 text-sm text-white gap-1">
            <span className="font-bold text-base text-gray-400">Breed</span>
            {data.breed}
          </p>
        </div>
      </div>
      <div className="card-footer">
        <Button className="mx-auto" onClick={() => handleMoreDetailsClick(data)}>
          More Details
        </Button>
      </div>
    </div>
  );
};

export default SimpleCard;
