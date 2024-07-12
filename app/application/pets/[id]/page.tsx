"use client";
import { useEffect, useState } from "react";
import usePetStore from "@/stores/pet-store";
import { Pet } from "@/types/Pets";
import Card from "@/components/pets/card/card";
import "./page.scss";
import LineChart from "@/components/lineChart/LineChart";
import Button from "@/components/button/Button";
import { FaWeight } from "react-icons/fa";
import CreateWeightForm from "@/components/forms/pet/CreateWeightForm";
import { useMainStore } from "@/stores/main-store";
import useWeightStore from "@/stores/weight-store";
import { getCurrentUserId } from "@/services/user/user_service";
import { fetchAndSetWeights } from "@/services/weightActions";
import { SimplifyToWeigthsArray } from "@/utils/convert";

const PetDetail = ({ params }: { params: { id: string } }) => {
  const [pet, setPet] = useState<Pet | undefined>();
  const { actions } = usePetStore();
  const { weights, loading } = useWeightStore();
  const { openModal } = useMainStore().actions;
  

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const fetchedPet = await actions.getPetById(params.id);
        setPet(fetchedPet);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [params.id, actions]);

  useEffect(() => {
    const fetchPetWeights = async () => {
      try {
        const userId = getCurrentUserId();
        fetchAndSetWeights(userId!, params.id);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPetWeights();
  }, [params.id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-pet-details">
      <div className="identity">
        <Card data={pet} />
      </div>
      <div className="weight">
        <LineChart data={SimplifyToWeigthsArray(weights)} title="weight curve monitoring" loading={loading} />
        <Button
          className="add-weight-button"
          onClick={() => openModal(<CreateWeightForm petId={pet.id} />)}
          icon={<FaWeight />}
        >
          Add weight
        </Button>{" "}
      </div>{" "}
      <div className="vaccines"></div>
      <div className="size"></div>
    </div>
  );
};

export default PetDetail;
