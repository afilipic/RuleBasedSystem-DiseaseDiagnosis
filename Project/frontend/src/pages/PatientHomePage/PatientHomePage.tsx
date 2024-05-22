import React, { ChangeEvent, useEffect, useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonIcon, ButtonText, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, StyledRoundButton, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';
import { Button, ButtonContent, ButtonWrapper, Card, Container, Content, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBarr, StepCircle, StepIndicatorContainer, TitleContainer } from '../MedicalExamPage/MedicalExamPage.styled';
import { CustomButton } from '../HomePage/HomePage.styled';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '../../utils/UserContext/useUser';


const PatientHomePage = () => {

    
    const [data, setData] = useState<PatientDTO>();
    
    const patientHistory = [
        { key: "Ime", value: data?.firstname },
        { key: "Prezime", value: data?.lastname },
        { key: "Datum rođenja", value: data?.birthDate },
        { key: "Visina", value: data?.height + " cm" },
        { key: "Težina", value: data?.weight + " kg" },
        { key: "Krvna grupa", value: data?.bloodType },
        { key: "Prethodne bolesti", value: data?.diagnoses.length! > 0 ? data?.diagnoses.map(diagnosis => diagnosis.disease.description || "Ne postoje").join(', ') : "Ne postoje" },
      
        // Dodajte ostale informacije koje želite da prikažete
      ];
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [percent, setPercent] = useState(0);
    const [toPercent, setToPercent] = useState(0);
    const [previous, setPrevious] = useState(false);

    const firstCardHistory = patientHistory.slice(0, 6);
    const secondCardHistory = patientHistory.slice(6);

    const loggedUser = useUser();
    console.log(loggedUser.user?.id)
    useEffect(() => {
        UserService.getPatientById(loggedUser.user?.id!).then(response => {
            setData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, [data]);


    const handleClickRow = (item: PatientDTO) => {
        console.log("Pacijent pregled")
    };

    const prevStep = () => {
        setPercent((step - 1) * 25.00);
        setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
        setToPercent((percent + 25.00))
        setPrevious(true);
      };
    
      const nextStep = () => {
        setPercent((step + 1) * 25.00);
        setStep((prevStep) => prevStep < 3 ? prevStep + 1 : prevStep);
        setToPercent(percent + 25.00)
        setPrevious(false);
      };

    return (
        <>
            <Container>
                <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
                    <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
                    <StepIndicatorContainer>
                        
                        <TitleContainer className='TitleN'>
                            <FormTitle>Moj profil</FormTitle>
                        </TitleContainer>
                    </StepIndicatorContainer>
                    <Content>
                        <MainContent>
                            <MainContentA>
                                <HistoryLabel>Osnovne informacije:</HistoryLabel>
                                <Card>
                                    <PatientHistoryList>
                                        {firstCardHistory.map((item, index) => (
                                            <PatientHistoryItem key={index}>
                                                <strong>{item.key}:</strong> {item.value}
                                            </PatientHistoryItem>
                                        ))}
                                    </PatientHistoryList>
                                </Card>
                                <HistoryLabel>Moja istorija bolesti:</HistoryLabel>
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
                                
                            </ButtonWrapper>
                            
                        </ButtonContent>
                    </Content>
                </Fieldset>
            </Container>


        </>

    );
};

export default PatientHomePage;
