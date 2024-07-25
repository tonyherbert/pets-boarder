import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import DataNotFound from "../dataNotFound/DataNotFound";
import { WeightChart, WeightForm } from "@/types/Weight";
import useWeightStore from "@/stores/weight-store";

interface LineChartProps {
  data:WeightChart[];
  title?: string;
  loading?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, loading }) => {
  const formatTooltip = (value: number, name: string, props: any) => {
    const unit = props.payload.unit;
      return [`${value} ${unit}`, name];
  };

  return (
    <>
      <h3>{title}</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip formatter={formatTooltip} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#036b91"
              activeDot={{ r: 8 }}
strokeWidth={3}            />
          </RechartsLineChart>
        </ResponsiveContainer>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};

export default LineChart;
