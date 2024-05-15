// UserHomePage.tsx

import React, { useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';

const DiagnosesPage = () => {
    const data = [
        { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123', datumIzdavanja: '22.5.2000' },
        { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987', datumIzdavanja: '15.10.1998' },
        { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456', datumIzdavanja: '5.3.2005' },
    ];
    const [searchInput, setSearchInput] = useState('');

    return (
        <TableContainer>
            <TableTitle>Diagnoze pacijenata</TableTitle>
            <SearchContainer>
            <StyledFontAwesomeIcon icon={faSearch} />
            <StyledInputSearch
                type="text"
                placeholder="Search actions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            </SearchContainer>
            {/* <MedicalTable data={data} searchInput={searchInput} onRowClick={function (row: { [key: string]: string; }): void {
                throw new Error('Function not implemented.');
            }}/>*/}
        </TableContainer>
    );
};

export default DiagnosesPage;
