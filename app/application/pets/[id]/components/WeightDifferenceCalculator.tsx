import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import useWeightStore from '@/stores/weight-store';
import { calculatePercentageDifferenceBetweenDates } from '@/utils/convert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FormValues {
  startDate: string;
  endDate: string;
}

const WeightDifferenceCalculator: React.FC = () => {
  const { weights, loading } = useWeightStore();
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
    if (!loading && weights.length > 0) {
      const uniqueDates = Array.from(
        new Set(weights.map((weight) => weight.date))
      );
      setDates(uniqueDates);
    }
  }, [weights, loading]);

  const onSubmit = (data: FormValues) => {
    try {
      const result = calculatePercentageDifferenceBetweenDates(
        weights,
        data.startDate,
        data.endDate,
        'date',
        'value'
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
          <Label htmlFor="start-date" className="mb-1">
            Start date{' '}
          </Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Select
                id="start-date"
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
          <Label htmlFor="end-date" className="mb-1">
            End date{' '}
          </Label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Select
                id="end-date"
                value={field.value}
                onValueChange={field.onChange}
                className="mt-1 block w-full border-input rounded-md shadow-sm"
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
