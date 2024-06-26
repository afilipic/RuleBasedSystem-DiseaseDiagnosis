import React, { ChangeEvent, useEffect, useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonIcon, ButtonText, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, StyledRoundButton, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';
import { Button, ButtonContent, ButtonWrapper, Card, Content, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList } from '../MedicalExamPage/MedicalExamPage.styled';
import { CustomButton } from '../HomePage/HomePage.styled';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AdminHomePage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        UserService.getAllUsers().then(response => {
            setData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, [data.length]);


    const handleClickRow = (item: PatientDTO) => {
        console.log("Admin pregled")
    };

    const handleAddUser = () => {
        navigate("/registration");
    }
   
    return (
        <>
            <TableContainer>
                <TableTitle>Korisnici</TableTitle>
                <SearchContainer>
                    <StyledRoundButton onClick={handleAddUser}>
                        <ButtonIcon>
                            <FontAwesomeIcon icon={faPlus} />
                        </ButtonIcon>
                        <ButtonText className="button-text">Dodaj korisnika</ButtonText>
                    </StyledRoundButton>

                    <div>
                        <StyledFontAwesomeIcon icon={faSearch} />
                        <StyledInputSearch
                            type="text"
                            placeholder="Search actions"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </SearchContainer>
                {data.length != 0 && (
                    <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} />
                )}
            </TableContainer>


        </>

    );
};

export default AdminHomePage;
