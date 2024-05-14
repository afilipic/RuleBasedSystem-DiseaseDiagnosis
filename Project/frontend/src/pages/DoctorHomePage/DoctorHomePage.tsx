import React, { useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';

const DoctorHomePage = () => {
    const data = [
        { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123' },
        { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987'},
        { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456' },
    ];
    const [searchInput, setSearchInput] = useState('');
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    const handleClickRow = (item: any) => {
        setSelectedRow(item)
        console.log(item)
    }; 
    return (
        <>
        <TableContainer>
            <TableTitle>Pacijenti</TableTitle>
            <SearchContainer>
            <StyledFontAwesomeIcon icon={faSearch} />
            <StyledInputSearch
                type="text"
                placeholder="Search actions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            </SearchContainer>
            <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} />            
        </TableContainer>        
        
        </>
        
    );
};

export default DoctorHomePage;
