// MedicalTable.tsx

import React, { useEffect, useState } from 'react';
import { ScrollableContainer, StyledTable, StyledTableRow, TableWrapper } from "./MedicalTableTests.styled";
import { PatientDTO } from '../../models/User';
import { BloodTestResponse } from '../../models/BloodTests';
import { Input } from '../../pages/LoginPage/LoginPage.styled';



export type MedicalTableTestsProps = {
    data: BloodTestResponse[];
    searchInput: string;
    onRowClick: (row: any) => void;
    handleValueChange?: (item: BloodTestResponse, value: string) => void;
};

export default function MedicalTableTests({ data, searchInput, onRowClick, handleValueChange }: MedicalTableTestsProps) {
    const [sortedData, setSortedData] = useState<BloodTestResponse[]>(data);
    const [filteredData, setFilteredData] = useState<BloodTestResponse[]>(data);
    const [sortField, setSortField] = useState<keyof BloodTestResponse>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;
    // const [clickedRow, setClickedRow] = useState< any | null>(null);

    useEffect(() => {
        let newFilteredData = data;
        if (searchInput.trim()) {
            const searchLower = searchInput.toLowerCase();
            newFilteredData = data.filter(item =>
                Object.values(item).some(value =>
                    value?.toString().toLowerCase().includes(searchLower)
                )
            );
        }
        setFilteredData(newFilteredData);
    }, [data, searchInput]);

    useEffect(() => {
        const newSortedData = [...filteredData].sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortOrder === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            }

            return 0; // Za nepoznate tipove, vratiti neutralnu vrednost
        });
        setSortedData(newSortedData);
    }, [filteredData, sortField, sortOrder]);

    const onSortChange = (field: keyof BloodTestResponse) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const renderSortArrow = (field: keyof BloodTestResponse) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return null;
    };

    const totalNumberOfPages: number = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems: BloodTestResponse[] = sortedData.slice(indexOfFirstItem, indexOfLastItem);



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
                                    <th key={index} onClick={() => onSortChange(key as keyof BloodTestResponse)}>
                                        {key} {renderSortArrow(key as keyof BloodTestResponse)}
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
                                        if (key === "value") {
                                    
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
