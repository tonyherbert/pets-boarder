import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMainStore } from '@/stores/main-store';
import { WeightForm } from '@/types/Weight';
import useWeightStore from '@/stores/weight-store';
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
import { format, parse } from 'date-fns';

interface CreateWeightFormProps {
  petId: string;
}

const CreateWeightForm: React.FC<CreateWeightFormProps> = ({ petId }) => {
  const { closeModal } = useMainStore().actions;
  const { actions } = useWeightStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<WeightForm>({
    defaultValues: {
      unit: 'kgs', // Set a default unit
      date: undefined, // Initialize date as undefined
    },
  });

  const onSubmit: SubmitHandler<WeightForm> = async (data) => {
    // Format the date as "YYYY/MM/dd"
    if (data.date) {
      data.date = format(new Date(data.date), 'yyyy/MM/dd');
    }

    actions.createWeight(data, petId);
    closeModal();
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-grow w-full md:w-1/2">
          <Label htmlFor="weight" className="mb-1">
            Weight
          </Label>
          <Input
            type="text"
            id="weight"
            {...register('weight', { required: 'This field is required' })}
            className="w-full"
          />
          {errors.weight && (
            <span className="text-red-500 text-sm">
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
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
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
            <span className="text-red-500 text-sm">{errors.unit.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow w-full">
        <Controller
          name="date"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <Popover>
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
          <span className="text-red-500 text-sm">{errors.date.message}</span>
        )}
      </div>

      <div className="flex flex-col justify-center w-full mt-4">
        <Button type="submit" className="w-full md:w-auto">
          Add Weight
        </Button>
      </div>
    </form>
  );
};

export default CreateWeightForm;
