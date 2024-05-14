// UserHomePage.tsx

import React, { useEffect, useState } from 'react';
import { Container, LabelContainer, Label, Title, CardContainer, Card, Container1 } from './DoctorHomePage.styled';
import MedicalTable from '../../components/shared/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';

const DoctorHomePage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    useEffect(() => {
        UserService.getAllPatients().then(response => {
            console.log(response.data)
            setData(response.data);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, [data.length]);


    const handleClickRow = (item: PatientDTO) => {
        setSelectedRow(item)
        console.log(item)
    }; 
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
            <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} />
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
