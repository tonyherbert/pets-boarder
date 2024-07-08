import React from "react";
import { Pet } from "@/types/Pets";
import "./card.scss";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CardProps {
  data: Pet;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const isSmallDevice = useMediaQuery(767);

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
        {!isSmallDevice ? <div className="divider-h" /> : <hr />}
        <div className="last-record">
          <h1>Last records</h1>
          <LastRecord title="Vaccines" date="01/01/2021" value="antirabique" />
          <LastRecord title="Weight" date="01/01/2021" value="10.5 kg" />
          <LastRecord title="Size" date="01/01/2021" value="52cm" />
        </div>
      </div>
    </div>
  );
};

export default Card;

const LastRecord: React.FC<{ title: string; date: string; value: string }> = ({
  title,
  date,
  value,
}) => {
  return (
    <div className="last-record-component">
      <h2>{title}</h2>
      <p>
        {date}-{value}
      </p>
    </div>
  );
};
