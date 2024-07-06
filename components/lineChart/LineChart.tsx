import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: Array<{ name: string; value: number; unit: string }>;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const formatTooltip = (value: number, name: string, props: any) => {
    const unit = props.payload.unit;
    return [`${value} ${unit}`, name];
  };

  return (
    <>
      <h3>{title}</h3>
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
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChart;
