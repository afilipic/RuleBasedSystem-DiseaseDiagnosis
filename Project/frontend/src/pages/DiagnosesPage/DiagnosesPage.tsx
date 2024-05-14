// UserHomePage.tsx

import React, { useState } from 'react';
import MedicalTable from '../../components/shared/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContainer, Container } from './DiagnosesPage.styled';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch } from '../../components/shared/styled/SharedStyles.styled';
import { Title } from '../DoctorHomePage/DoctorHomePage.styled';

const DiagnosesPage = () => {
    const data = [
        { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123', datumIzdavanja: '22.5.2000' },
        { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987', datumIzdavanja: '15.10.1998' },
        { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456', datumIzdavanja: '5.3.2005' },
        // Dodajte više podataka po potrebi
    ];
    const [searchInput, setSearchInput] = useState('');

    return (
        <Container>
            <Title>Diagnoze pacijenata</Title>
            <SearchContainer>
            <StyledFontAwesomeIcon icon={faSearch} />
            <StyledInputSearch
                type="text"
                placeholder="Search actions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            </SearchContainer>
            <MedicalTable data={data} searchInput={searchInput} onRowClick={function (row: { [key: string]: string; }): void {
                throw new Error('Function not implemented.');
            }}/>
        </Container>
    );
};

export default DiagnosesPage;
