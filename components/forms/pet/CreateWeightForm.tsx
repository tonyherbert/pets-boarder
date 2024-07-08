import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateWeightForm.module.scss";
import { getCurrentUserId } from "@/services/user/user_service";
import { useMainStore } from "@/stores/main-store";
import usePetStore from "@/stores/pet-store";
import { WeightForm } from "@/types/Weight";
import Button from "@/components/button/Button";
import { IoMdAddCircle } from "react-icons/io";
import { addPetWeight } from "@/services/pet/weight_service";
import useWeightStore from "@/stores/weight-store";

interface CreateWeightFormProps {
  petId: string;
}

const CreateWeightForm: React.FC<CreateWeightFormProps> = ({ petId }) => {
  const [unit, setUnit] = useState<string>("kg");

  const { closeModal } = useMainStore().actions;
  const { createWeight } = useWeightStore().actions;
  const { actions, loading, error } = usePetStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WeightForm>();

  const onSubmit: SubmitHandler<WeightForm> = async (data) => {
    const userId = getCurrentUserId();
    createWeight(userId!, petId, {
      weight: Number(data.weight),
      date: data.date,
      unit: unit,
    });
    closeModal();
  };

  return (
    <>
      <h3>adding weight to your pet</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={`${styles.formGroup} `}>
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            id="weight"
            {...register("weight", { required: true })}
          />
          {errors.weight && <span>This field is required</span>}
        </div>
        <div className={styles.radioGroup}>
          <input
            {...register("unit", { required: true })}
            type="radio"
            value="kg"
            defaultChecked
          />
          <p>Kg</p>
          <input
            {...register("unit", { required: true })}
            type="radio"
            value="lbs"
          />
          <p>Lbs</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
          />
          {errors.date && <span>This field is required</span>}
        </div>

        <Button icon={<IoMdAddCircle />}>add weight</Button>
      </form>
    </>
  );
};

export default CreateWeightForm;
