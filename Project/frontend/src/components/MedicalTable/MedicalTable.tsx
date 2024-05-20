// MedicalTable.tsx

import React, { useEffect, useState } from 'react';
import { ScrollableContainer, StyledTable, StyledTableRow, TableWrapper } from "./MedicalTable.styled";
import { PatientDTO } from '../../models/User';
import { BloodTestResponse } from '../../models/BloodTests';
import { Input } from '../../pages/LoginPage/LoginPage.styled';



export type MedicalTableProps = {
    data: PatientDTO[] | BloodTestResponse[];
    searchInput: string;
    onRowClick: (row: any) => void;
    handleValueChange?: (item: BloodTestResponse, value: string) => void;
};

export default function MedicalTable({ data, searchInput, onRowClick, handleValueChange }: MedicalTableProps) {
    const [sortedData, setSortedData] = useState<PatientDTO[]| BloodTestResponse[]>(data);
    const [sortField, setSortField] = useState<string>('timestamp');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;
    // const [clickedRow, setClickedRow] = useState< any | null>(null);

    useEffect(() => {
        // const newSortedData = [...data].sort((a, b) => {
        //     let valueA = a[sortField];
        //     let valueB = b[sortField];
        //     // console.log("a:", a); // Provjerite vrijednost objekta a
        //     // console.log("b:", b);
        //     if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        //     if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        //     if (typeof valueA === 'undefined' || typeof valueB === 'undefined') {
        //         return 0; // Ako nisu definirane, vratite neutralnu vrijednost
        //     }
        //     return sortOrder === 'asc' ?
        //         valueA.localeCompare(valueB) :
        //         valueB.localeCompare(valueA);
        // });
        // setSortedData(newSortedData);
        setSortedData(data);
    }, [data, sortField, sortOrder]);

    const onSortChange = (field: string) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const renderSortArrow = (field: string) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return null;
    };

    const totalNumberOfPages: number = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems: PatientDTO[] | BloodTestResponse[] = sortedData.slice(indexOfFirstItem, indexOfLastItem);



    const highlightText = (text: string, search: string) => {
        text = text.toString()
        if (!search.trim()) {
            return text;
        }

        const regex = new RegExp(`(${search})`, 'gi');
        const parts  = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
        );
    };
    const handleClickRow = (item: any) => {
        onRowClick(item);
    };

    return (
        <TableWrapper>
            <ScrollableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).map((key, index) => {
                                if (Array.isArray((data[0] as any)[key]) || key == "id") {
                                    return null; // Ignoriši listu
                                }
                                return (
                                    <th key={index} onClick={() => onSortChange(key)}>
                                        {key} {renderSortArrow(key)}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={index} onClick={() => handleClickRow(item)}>
                                    {Object.entries(item).map(([key, value], index) => {
                                        if (Array.isArray(value) || key == "id") {
                                            return null; // Ignoriši listu
                                        }
                                        if (key === "value" && (item as BloodTestResponse)) {
                                    
                                            return (
                                                <td key={index}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) => handleValueChange!((item as BloodTestResponse), e.target.value)}
                                                    />
                                                </td>
                                            );
                                        }
                                        return (
                                            <td key={index}>{highlightText(value, searchInput)}</td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={Object.keys(data[0]).length}><h2>No data</h2></td>
                            </tr>
                        )}
                    </tbody>

                </StyledTable>
            </ScrollableContainer>

        </TableWrapper>
    )
}
