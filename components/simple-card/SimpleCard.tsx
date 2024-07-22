"use client";
import React from "react";
import { Pet } from "@/types/Pets";
import "./SimpleCard.scss";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "../button/Button";
import { useRouter } from "next/navigation";  // Assurez-vous d'importer useRouter
import usePetStore from "@/stores/pet-store";

interface CardProps {
  data: Pet;
}

const SimpleCard: React.FC<CardProps> = ({ data }) => {
  const isSmallDevice = useMediaQuery(767);
  const {setSelectedPet} = usePetStore().actions;
  const router = useRouter();

  const handleMoreDetailsClick = (pet: Pet) => {
    setSelectedPet(pet)
    router.push(`pets/${data.id}`) 
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="name">
          {data.name}
          {data.gender === "Male" ? <BsGenderMale /> : <BsGenderFemale />}
        </h1>
        <h2 className="race">{data.race} </h2>
        <span className="birthDate">{data.birthDate}</span>
        <hr />
      </div>
      <div className="card-content">
        <div className="animal-identity">
          <p className="detail">
            <span className="label">Chip number </span>
            {data.chipNumber}
          </p>
          <p className="detail">
            <span className="label">Lof</span>
            {data.lof}
          </p>
          <p className="detail">
            <span className="label">Breed</span> {data.breed}
          </p>
        </div>
      </div>
      <div className="card-footer">
        <Button className="details-button" onClick={()=>handleMoreDetailsClick(data)}>More Details</Button>
      </div>
    </div>
  );
};

export default SimpleCard;
