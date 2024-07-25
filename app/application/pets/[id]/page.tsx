"use client";
import { useEffect } from "react";
import usePetStore from "@/stores/pet-store";
import "./page.scss";
import LineChart from "@/components/lineChart/LineChart";
import Button from "@/components/button/Button";
import { FaExpand, FaSyringe, FaWeight } from "react-icons/fa";
import { useMainStore } from "@/stores/main-store";
import useWeightStore from "@/stores/weight-store";
import { getCurrentUserId } from "@/services/user/user_service";
import { SimplifyToWeigthsArray } from "@/utils/convert";
import { fetchAndSetWeights } from "@/dataManager/weightDataManager";
import { getPetByIdAndUpdateStore } from "@/dataManager/petDataManager";
import CreateVaccineForm from "@/components/forms/pet/CreateVaccineForm";
import { fetchAndSetVaccines } from "@/dataManager/vaccineDataManager";
import useVaccineStore from "@/stores/vaccine-store";
import TableVaccines from "./components/VaccinesTable";
import Paper from '@mui/material/Paper';
import CreateWeightForm from "@/components/forms/pet/CreateWeightForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const PetDetail = ({ params }: { params: { id: string } }) => {
  const { selectedPet } = usePetStore();  
  const { weights, loading } = useWeightStore();
  const { vaccines } = useVaccineStore();
  const { openModal } = useMainStore().actions;
  

  useEffect(() => {
    const fetchPet = async () => {
      try {
        getPetByIdAndUpdateStore(params.id);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [params.id]);

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

    useEffect(() => {
    const fetchPetVaccines = async () => {
      try {
        const userId = getCurrentUserId();
        fetchAndSetVaccines(userId!, params.id);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPetVaccines();
  }, [params.id]);

  if (!selectedPet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <div className="weight">
      <Button
          className="add-weight-button"
          onClick={() => openModal(<CreateWeightForm petId={selectedPet!.id} />)}
          icon={<FaWeight />}
        >
          Add weight
        </Button>  <Paper>
       <LineChart data={SimplifyToWeigthsArray(weights)} title="weight curve monitoring" loading={loading} />
    </Paper>
          
    </div>
<div className="vaccines">
    <Button
          className="add-weight-button"
          onClick={() => openModal(<CreateVaccineForm petId={selectedPet!.id} />)}
          icon={<FaSyringe />
}
        >
          Add vaccine
        </Button> <TableVaccines rows={vaccines}/>
  {" "}</div>

    </div>
  );
};

export default PetDetail;
