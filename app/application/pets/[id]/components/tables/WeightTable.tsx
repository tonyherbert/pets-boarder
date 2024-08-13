import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Weight } from '@/types/Weight';
import { formatDate } from '@/utils/convert';

// Define the props interface
interface WeightTableProps {
  data: Weight[];
}

// Define the component as a React.FC with the defined props
const WeightTable: React.FC<WeightTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Weight</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((weight, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{weight.weight}</TableCell>
            <TableCell>{weight.unit}</TableCell>
            <TableCell>{formatDate(weight.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default WeightTable;
