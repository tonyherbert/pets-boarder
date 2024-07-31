import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateWeightForm.module.scss";
import { getCurrentUserId } from "@/services/user/user_service";
import { useMainStore } from "@/stores/main-store";
import usePetStore from "@/stores/pet-store";
import Button from "@/components/button/Button";
import { IoMdAddCircle } from "react-icons/io";
import { addWeightAndUpdateStore } from "@/dataManager/weightDataManager";
import { addPetVaccine, getVaccinesList } from "@/services/firebase/pet/vaccine_service";
import { addMonthsToDate } from "@/utils/convert";
import { addVaccinesAndUpdateStore } from "@/dataManager/vaccineDataManager";

interface CreateVaccineFormProps {
  petId: string;
}

interface Vaccine {
  id: string;
  name: string;
  reminder: number[]; // Example: [6, 12, 24]
}

const CreateVaccineForm: React.FC<CreateVaccineFormProps> = ({ petId }) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
  const { closeModal } = useMainStore().actions;
  const { actions, loading, error } = usePetStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const fetchedVaccines = await getVaccinesList();
        setVaccines(fetchedVaccines);
      } catch (error) {
        console.error("Erreur lors de la récupération des vaccins :", error);
      }
    };

    fetchVaccines();
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const userId = getCurrentUserId();
    data = {... data, reminder: addMonthsToDate(data.date,data.reminder), name: selectedVaccine!.name};
        
 await addVaccinesAndUpdateStore(petId, data);
    closeModal();
  };

  const selectedVaccineHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vaccine = vaccines.find(v => v.id === e.target.value) || null;
    setSelectedVaccine(vaccine);
  };

  return (
    <>
      <h3>Adding vaccine to Your Pet</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="vaccine">Vaccine</label>
          <select
            id="vaccine"
            {...register("vaccine")}
            onChange={selectedVaccineHandler}
            value={selectedVaccine?.name || ""}
          >
            <option value="" disabled>Select a vaccine</option>
            {vaccines.map((vaccine) => (
              <option key={vaccine.id} value={vaccine.id}>
                {vaccine.name}
              </option>
            ))}
          </select>
        </div>
        {selectedVaccine && (
          <div className={styles.formGroup}>
            <label htmlFor="reminder">Reminder</label>
            <select
              id="reminder"
              {...register("reminder")}
            >
              {selectedVaccine.reminder.map((reminder) => (
                <option key={reminder} value={reminder}>
                  {reminder} months
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="date">Date Injection</label>
          <input
            type="date"
            id="registerAt"
            {...register("registerAt", { required: true })}
          />
          {errors.date && <span>This field is required</span>}
        </div>
        <Button icon={<IoMdAddCircle />}>Add Vaccine</Button>
      </form>
    </>
  );
};

export default CreateVaccineForm;
