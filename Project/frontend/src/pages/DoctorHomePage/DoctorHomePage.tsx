import React, { useEffect, useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';
import { Button, ButtonContent, ButtonWrapper, Card, Content, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList } from '../MedicalExamPage/MedicalExamPage.styled';
import { CustomButton } from '../HomePage/HomePage.styled';
import { StyledRoundButton } from './DoctorHomePage.styled';
import { useNavigate } from 'react-router-dom';


const patientHistory = [
    { key: "Datum rođenja", value: "01.01.1990." },
    { key: "Visina", value: "180 cm" },
    { key: "Težina", value: "80 kg" },
    { key: "Krvna grupa", value: "A+" },
    { key: "Alergije", value: "Prašina, polen" },
    { key: "Prethodne bolesti", value: "Upala pluća (2015), Grip (2018)" },
];
const DoctorHomePage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const navigate = useNavigate();

    const firstCardHistory = patientHistory.slice(0, 4);
    const secondCardHistory = patientHistory.slice(4);

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
        navigate("/medical-examination", { state: { patient: item } });
    };

    const prevStep = () => {
        setSelectedRow(null)
    };

    const medicalExam = () => {
        setSelectedRow(null)
    };

    const content = (
        <Content>
            <MainContent>
                <MainContentA>
                    <HistoryLabel>Informacije o pacijentu:</HistoryLabel>
                    <Card>
                        <PatientHistoryList>
                            {firstCardHistory.map((item, index) => (
                                <PatientHistoryItem key={index}>
                                    <strong>{item.key}:</strong> {item.value}
                                </PatientHistoryItem>
                            ))}
                        </PatientHistoryList>
                    </Card>
                    <HistoryLabel>Istorija bolesti pacijenta:</HistoryLabel>
                    <Card>
                        <PatientHistoryList>
                            {secondCardHistory.map((item, index) => (
                                <PatientHistoryItem key={index}>
                                    <strong>{item.key}:</strong> {item.value}
                                </PatientHistoryItem>
                            ))}
                        </PatientHistoryList>
                    </Card>
                </MainContentA>
            </MainContent>
            <ButtonContent>
                <ButtonWrapper>
                    <Button onClick={prevStep}>
                        <span>&#8592;</span>
                    </Button>
                    <Label>Prethodni korak</Label>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Label>Sledeci korak</Label>
                    <Button onClick={medicalExam}>
                        <span>&#8594;</span>
                    </Button>
                </ButtonWrapper>
            </ButtonContent>
        </Content>
    );

    const handleAddPatient = () => {
        navigate("/registration");
    }

    return (
        <>
            <TableContainer>
                <TableTitle>Pacijenti</TableTitle>
                <SearchContainer>
                    <StyledRoundButton onClick={handleAddPatient}>
                        +
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

export default DoctorHomePage;
