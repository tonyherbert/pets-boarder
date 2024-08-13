import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import useWeightStore from '@/stores/weight-store';
import {
  calculatePercentageDifferenceBetweenDates,
  formatDate,
  normalizeDate,
} from '@/utils/convert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Weight } from '@/types/Weight';
import moment from 'moment';

interface FormValues {
  startDate: string;
  endDate: string;
}

interface WeightDifferenceCalculatorProps {
  weights: Weight[];
}

const WeightDifferenceCalculator: React.FC<WeightDifferenceCalculatorProps> = ({
  weights,
}) => {
  console.log('weights', weights);

  const [percentageDifference, setPercentageDifference] = useState<
    number | undefined
  >(undefined);
  const [dates, setDates] = useState<string[]>([]);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (weights.length > 0) {
      const uniqueDates = Array.from(
        new Set(weights.map((weight) => formatDate(weight.date, 'dd/MM/yyyy')))
      );

      setDates(uniqueDates);
    }
  }, [weights]);

  const onSubmit = (data: FormValues) => {
    try {
      const startDate = normalizeDate(data.startDate);
      const endDate = normalizeDate(data.endDate);

      const result = calculatePercentageDifferenceBetweenDates(
        weights,
        startDate,
        endDate,
        'date',
        'weight'
      );
      setPercentageDifference(result?.percentageDifference);
    } catch (error) {
      console.error('Error calculating percentage difference:', error);
      setPercentageDifference(undefined);
    }
  };

  const getColorClass = (difference: number | undefined) => {
    if (difference === undefined) return '';
    return difference > 0 ? 'text-success' : 'text-negative';
  };

  return (
    <form
      className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-card rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label className="mb-1">Calculate Percentage </Label>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label id="start-date-label" htmlFor="start-date" className="mb-1">
            Start date{' '}
          </Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Select
                aria-labelledby="start-date-label"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full bg-background">
                  <span>{field.value || 'Select date'}</span>
                </SelectTrigger>
                <SelectContent>
                  {dates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col">
          <Label id="end-date-label" htmlFor="end-date" className="mb-1">
            End date{' '}
          </Label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Select
                aria-labelledby="end-date-label"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full bg-background">
                  <span>{field.value || 'Select date'}</span>
                </SelectTrigger>
                <SelectContent>
                  {dates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <Button type="submit" className="btn-primary">
        know variation{' '}
      </Button>
      {percentageDifference !== undefined && (
        <div className="mt-4 text-lg font-semibold flex flex-col items-center">
          <div
            className={`text-md font-semibold ${getColorClass(percentageDifference)}`}
          >
            {percentageDifference.toFixed(2)}%
            {percentageDifference > 0 ? (
              <TrendingUp className="h-4 w-4 inline ml-2 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 inline ml-2 text-negative" />
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default WeightDifferenceCalculator;
