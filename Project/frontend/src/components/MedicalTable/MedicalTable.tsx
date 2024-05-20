// MedicalTable.tsx

import React, { useEffect, useState } from 'react';
import { PaginationButton, ScrollableContainer, StyledTable, StyledTableRow, TableWrapper } from "./MedicalTable.styled";
import { PatientDTO } from '../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';



export type MedicalTableProps = {
    data: PatientDTO[] ;
    searchInput: string;
    onRowClick: (row: any) => void;
};

type PaginationButtonProps = {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
};

export default function MedicalTable({ data, searchInput, onRowClick }: MedicalTableProps) {
    const [sortedData, setSortedData] = useState<PatientDTO[]>(data);
    const [filteredData, setFilteredData] = useState<PatientDTO[]>(data);
    const [sortField, setSortField] = useState<keyof PatientDTO>('username');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const totalNumberOfPages: number = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems: PatientDTO[] = sortedData.slice(indexOfFirstItem, indexOfLastItem);

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

    const onSortChange = (field: keyof PatientDTO) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const renderSortArrow = (field: keyof PatientDTO) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return null;
    };

    const highlightText = (text: string, search: string) => {
        if(!text){
            return;
        }
        text = text.toString()
        if (!search.trim()) {
            return text;
        }

        const regex = new RegExp(`(${search})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
        );
    };
    const handleClickRow = (item: any) => {
        onRowClick(item);
    };

    const handleNextPage = () => {
        if (currentPage < totalNumberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                                    <th key={index} onClick={() => onSortChange(key as keyof PatientDTO)}>
                                        {key} {renderSortArrow(key as keyof PatientDTO)}
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
            <div>
                <PaginationButton className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </PaginationButton>
                <span> Page {currentPage} of {totalNumberOfPages} </span>
                <PaginationButton className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalNumberOfPages}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </PaginationButton>
            </div>

        </TableWrapper>
    )
}
