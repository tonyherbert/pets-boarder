import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { inputWeightSchema } from '@/schemas/schemas';
import { createWeightAction } from '@/app/application/pets/[id]/weight.action';
import { useRouter } from 'next/navigation';
import { isWeightDateAlreadyUsedInWeights } from '@/utils/dateUtils';

interface CreateWeightFormProps {
  petId: string;
  loading: boolean;
}

const CreateWeightForm: React.FC<CreateWeightFormProps> = ({
  petId,
  loading,
}) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof inputWeightSchema>>({
    resolver: zodResolver(inputWeightSchema),
    mode: 'onSubmit',
    defaultValues: {
      date: undefined,
      unit: 'kgs',
      weight: '',
    },
  });

  setValue('petId', petId);

  const onSubmit: SubmitHandler<z.infer<typeof inputWeightSchema>> = async (
    data
  ) => {
    const dateExists = await isWeightDateAlreadyUsedInWeights(
      petId,
      new Date(data.date)
    );

    if (dateExists) {
      setError('date', {
        type: 'manual',
        message: 'A weight entry for this date already exists.',
      });
      return;
    }

    clearErrors('date');

    const [result, error] = await createWeightAction({
      petId: petId,
      weight: data.weight,
      unit: data.unit,
      date: data.date,
    });

    if (error) {
      console.error('Failed to create weight:', error);
    } else {
      console.log('Weight created successfully with ID:', result);
      reset({
        date: undefined,
        unit: 'kgs',
        weight: '',
      });
    }
    router.refresh();
  };

  return (
    <form
      className="flex flex-col gap-4 w-full p-6 max-w-md mx-auto bg-card rounded-lg "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label className="mb-1">Add new weight</Label>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-grow w-full md:w-1/2">
          <Label htmlFor="weight" className="mb-1">
            Weight
          </Label>
          <Input
            type="text"
            id="weight"
            {...register('weight')}
            className="w-full"
          />
          {errors.weight && (
            <span className="text-negative text-sm">
              {errors.weight.message}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-grow w-full md:w-1/2">
          <Label htmlFor="unit" className="mb-1">
            Unit
          </Label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                {...register('unit', {
                  required: 'This field is required',
                })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit</SelectLabel>
                    <SelectItem value="kgs">Kgs</SelectItem>
                    <SelectItem value="lbs">Lbs</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.unit && (
            <span className="text-negative text-sm">{errors.unit.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow w-full">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover
              {...register('date', {
                required: 'This field is required',
              })}
            >
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
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
        {errors.date && (
          <span className="text-negative text-sm">{errors.date.message}</span>
        )}
      </div>

      <div className="flex flex-col justify-center w-full mt-4">
        <Button type="submit" className="btn-primary" disabled={loading}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default CreateWeightForm;
