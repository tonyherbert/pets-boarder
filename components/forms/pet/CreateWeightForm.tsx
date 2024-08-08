import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMainStore } from '@/stores/main-store';
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
  loading: boolean;
}

interface WeightForm {
  weight: string; // Le poids est représenté comme une chaîne de caractères
  unit: 'kgs' | 'lbs'; // L'unité est soit 'kgs' ou 'lbs'
  date?: string; // La date est optionnelle et peut être un objet Date ou undefined
}

const CreateWeightForm: React.FC<CreateWeightFormProps> = ({
  petId,
  loading,
}) => {
  const { closeModal } = useMainStore().actions;
  const { actions } = useWeightStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WeightForm>({
    defaultValues: {
      unit: 'kgs',
      date: undefined,
    },
  });

  const onSubmit: SubmitHandler<WeightForm> = async (data) => {
    if (data.date) {
      data.date = format(new Date(data.date), 'yyyy/MM/dd');
    }

    actions.createWeight(data, petId);
    closeModal();
  };

  return (
    <form
      className="flex flex-col gap-4 w-full p-6 max-w-md mx-auto bg-card rounded-lg shadow-lg"
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
            {...register('weight', { required: 'This field is required' })}
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
            <span className="text-negative text-sm">{errors.unit.message}</span>
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
          <span className="text-negative text-sm">{errors.date.message}</span>
        )}
      </div>

      <div className="flex flex-col justify-center w-full mt-4">
        <Button type="submit" className="btn-primary">
          Add Weight
        </Button>
      </div>
    </form>
  );
};

export default CreateWeightForm;
