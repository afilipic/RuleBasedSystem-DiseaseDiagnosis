// UserHomePage.tsx

import React, { useState } from 'react';
import { Container, LabelContainer, Label, Title, CardContainer, Card, Container1 } from './DoctorHomePage.styled';
import MedicalTable from '../../components/shared/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch } from '../../components/shared/styled/SharedStyles.styled';

const DoctorHomePage = () => {
    const data = [
        { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123' },
        { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987'},
        { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456' },
        // Dodajte više podataka po potrebi
    ];
    const [searchInput, setSearchInput] = useState('');

    return (
        <Container>
            <Title>Pacijenti</Title>
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
            } } />
            {/* <CardContainer>
                <Card   >
                    <span>Ana</span>
                    <span>Marković</span>
                    <span>345674535</span>
                    <span>22.5.2000</span>
                </Card>
            </CardContainer> */}
        </Container>
    );
};

export default DoctorHomePage;
