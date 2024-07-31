import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreatePetForm.module.scss";
import { PetForm } from "@/types/Pets";
import { useMainStore } from "@/stores/main-store";
import usePetStore from "@/stores/pet-store";
import { createPet, fetchPets } from "@/actions/pets";

const CreatePetForm: React.FC = () => {
  const { closeModal } = useMainStore().actions;
  const { actions } = usePetStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetForm>();

  const onSubmit: SubmitHandler<PetForm> = async (data) => {
    try {
      await createPet(data);
      const updatedPets = await fetchPets();
      actions.setPets(updatedPets);
      closeModal();
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="chipNumber">Chip Number</label>
        <input
          type="text"
          id="chipNumber"
          {...register("chipNumber", { required: true })}
        />
        {errors.chipNumber && <span>This field is required</span>}
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="lof">LOF</label>
        <input type="text" id="lof" {...register("lof")} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="animalType">Animal Type</label>
        <input
          type="text"
          id="animalType"
          {...register("animalType", { required: true })}
        />
        {errors.animalType && <span>This field is required</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          id="breed"
          {...register("breed", { required: true })}
        />
        {errors.breed && <span>This field is required</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          {...register("birthDate", { required: true })}
        />
        {errors.birthDate && <span>This field is required</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gender">Gender</label>
        <div className={styles.radioGroup}>
          <input
            {...register("gender", { required: true })}
            type="radio"
            value="Male"
            id="genderMale"
          />
          <label htmlFor="genderMale">Male</label>
          <input
            {...register("gender", { required: true })}
            type="radio"
            value="Female"
            id="genderFemale"
          />
          <label htmlFor="genderFemale">Female</label>
        </div>
        {errors.gender && <span>This field is required</span>}
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default CreatePetForm;
