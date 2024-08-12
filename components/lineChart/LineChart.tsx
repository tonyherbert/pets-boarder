import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Weight, WeightChart, WeightFromFirestore } from '@/types/Weight';
import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  CardTitle,
  CardDescription,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { calculatePercentageDifference, formatDate } from '@/utils/convert';

interface LineChartProps {
  data: Weight[];
  loading?: boolean;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const LineChartComponent: React.FC<LineChartProps> = ({ data, loading }) => {
  const formatTooltip = (value: number, name: string, props: any) => {
    const unit = props.payload.unit;
    return [`${value} ${unit}`];
  };
  const progressWeight = calculatePercentageDifference(data, 'date', 'weight');

  const textResultProgressWeight = progressWeight
    ? `
  Weight increased from ${formatDate(progressWeight.oldestDate)} (${data!.find((w) => formatDate(w.date) === formatDate(progressWeight.oldestDate))?.weight} kg) 
  to ${formatDate(progressWeight.mostRecentDate)} (${data!.find((w) => formatDate(w.date) === formatDate(progressWeight.mostRecentDate))?.weight} kg), 
  a ${progressWeight.percentageDifference.toFixed(2)}% ${progressWeight.percentageDifference > 0 ? 'increase' : 'decrease'}.
  `
    : 'No weight data available to calculate progress.';

  const formattedData = data.map((item) => ({
    ...item,
    date: formatDate(item.date, 'dd/MM/yyyy'),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>{'Weight trend graph'}</CardTitle>
        <CardDescription>Monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart
                data={formattedData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 40,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={35}
                />
                <Tooltip
                  formatter={formatTooltip}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div>Data not found</div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {textResultProgressWeight}
          {progressWeight && (
            <>
              {progressWeight.percentageDifference > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total weight from birth
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChartComponent;
