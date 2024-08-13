'use client';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMainStore } from '@/stores/main-store';
import usePetStore from '@/stores/pet-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { createPet } from '@/app/application/pets/pets.actions';
import { useRouter } from 'next/navigation';
import { inputPetSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const CreatePetForm: React.FC = () => {
  const { closeModal } = useMainStore().actions;
  const { actions } = usePetStore();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof inputPetSchema>>({
    resolver: zodResolver(inputPetSchema),
    defaultValues: {
      gender: 'Male',
      birthDate: undefined,
      animalType: '',
      breed: '',
      chipNumber: '',
      lof: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof inputPetSchema>> = async (
    data
  ) => {
    const [result, error] = await createPet({
      name: data.name,
      chipNumber: data.chipNumber,
      lof: data.lof,
      animalType: data.animalType,
      breed: data.breed,
      birthDate: data.birthDate,
      gender: data.gender,
    });

    if (error) {
      console.error('Error creating pet:', error);
      return;
    }

    console.log('Pet created successfully:', result);
    router.refresh();
    closeModal();
  };

  return (
    <form
      className="flex flex-col gap-4 w-full p-6 max-w-md mx-auto bg-card rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label className="mb-1">Add a new pet</Label>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col/2 md:flex-row gap-4">
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input
              id="name"
              {...register('name', { required: 'This field is required' })}
              placeholder="Enter pet's name"
              className="w-full"
            />
            {errors.name && (
              <span className="text-negative text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="breed" className="mb-1">
              Breed
            </Label>
            <Input
              id="breed"
              {...register('breed', { required: 'This field is required' })}
              placeholder="Enter breed"
              className="w-full"
            />
            {errors.breed && (
              <span className="text-negative text-sm">
                {errors.breed.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col/2 md:flex-row gap-4">
          <div className="flex flex-col">
            <Label htmlFor="chipNumber" className="mb-1">
              Chip Number
            </Label>
            <Input
              id="chipNumber"
              {...register('chipNumber', {
                required: 'This field is required',
              })}
              placeholder="Enter chip number"
              className="w-full"
            />
            {errors.chipNumber && (
              <span className="text-negative text-sm">
                {errors.chipNumber.message}
              </span>
            )}
          </div>{' '}
          <div className="flex flex-col">
            <Label htmlFor="lof" className="mb-1">
              LOF
            </Label>
            <Input
              id="lof"
              {...register('lof', { required: 'This field is required' })}
              placeholder="Enter LOF number"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="animalType" className="mb-1">
            Animal Type
          </Label>
          <Input
            id="animalType"
            {...register('animalType', { required: 'This field is required' })}
            placeholder="Enter type of animal"
            className="w-full"
          />
          {errors.animalType && (
            <span className="text-negative text-sm">
              {errors.animalType.message}
            </span>
          )}
        </div>

        <div className="flex flex-col/2 md:flex-row gap-4 w-full">
          <div className="flex flex-col w-1/2">
            <Label htmlFor="gender" className="mb-1">
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <span className="text-negative text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-3/4">
            <Label htmlFor="birthDate" className="mb-1">
              Birth Date
            </Label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <Popover
                  {...register('birthDate', {
                    required: 'This field is required',
                  })}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), 'yyyy/MM/dd')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.birthDate && (
              <span className="text-negative text-sm">
                {errors.birthDate.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full mt-4">
        <Button type="submit" className="btn-primary">
          Create Pet
        </Button>
      </div>
    </form>
  );
};

export default CreatePetForm;
