'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Weight } from '@/types/Weight'
import { formatDate } from '@/utils/convert'
import LucideIcon from '@/components/ui/LucideIcon'
import { Button } from '@/components/ui/button'
import { deleteWeightAction } from '../../weight.action'
import { useServerAction } from 'zsa-react'
import { useServerActionMutation } from '@/lib/zsa.query'
import { useRouter } from 'next/navigation'

// Define the props interface
interface WeightTableProps {
    data: Weight[]
}

const WeightTable: React.FC<WeightTableProps> = ({ data }) => {
    const router = useRouter()

    // Déplacez l'appel du hook ici
    const { isPending, mutate } = useServerActionMutation(deleteWeightAction)

    const onDeleteWeight = (weightId: string, petId: string) => {
        mutate(
            { weightId: weightId, petId: petId },
            {
                onSuccess: () => {
                    router.refresh()
                },
            }
        )
    }
    return (
        <Table id="weight-table" className="w-auto md:w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Weight</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action(s)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((weight, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            {weight.weight}
                        </TableCell>
                        <TableCell>{weight.unit}</TableCell>
                        <TableCell>{formatDate(weight.date)}</TableCell>
                        <TableCell>
                            <Button
                                onClick={() =>
                                    onDeleteWeight(weight.id, weight.petId)
                                }
                                disabled={isPending}
                            >
                                <LucideIcon name="trash-2" />
                            </Button>
                        </TableCell>
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
    )
}

export default WeightTable
