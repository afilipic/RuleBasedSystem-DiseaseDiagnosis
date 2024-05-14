import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonContent, ButtonWrapper, Card, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from '../MedicalExamPage/MedicalExamPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { InputField, CardContainer,MainContent,APContent, Container2 } from './MedicalTechHomePage.styled';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch } from '../../components/shared/styled/SharedStyles.styled';
import MedicalTable from '../../components/shared/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Title } from '../DoctorHomePage/DoctorHomePage.styled';

const symptomsList = [
  "Umor",
  "Žeđ",
  "Nesanica",
  "Suva koža",
  "Tremor ruku",
  "Groznica",
  "Glavobolja",
  "Opadaje kose",
  "Ubrzan rad srca",
  "Osip na koži",
  "Učestalo mokrenje",
  "Neredovni ciklusi",
  "Mučnina, povraćanje",
  "Poremećaj vida",
  "Bolovi u zglobovima",
  "Otekline zglobova",
  "Promjene raspoloženja",
  "Povećanje tjelesne težine",
  "Gubitak tjelesne težine",
  "Osjetljivost na toplotu",
  "Promjene u raspoloženju"

];

const analysisParametersList = [
  "TSH",
  "T3",
  "T4",
  "Anti-TPO",
  "Anti-Tg",
  "ANA",
  "Anti-dsDNA",
  "Anti-Sm",
  "Glukoza",
  "HbA1c",
  "C-peptid",
  "Insulin "
];

const patientHistory = [
  { key: "Datum rođenja", value: "01.01.1990." },
  { key: "Visina", value: "180 cm" },
  { key: "Težina", value: "80 kg" },
  { key: "Krvna grupa", value: "A+" },  
  { key: "Alergije", value: "Prašina, polen" },
  { key: "Prethodne bolesti", value: "Upala pluća (2015), Grip (2018)" },
];

const possibleDiseases = [
  "Hashimoto Tireoiditis",
  "Reumatoidni artritis"
];  

const MedicalTechHomePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [previous, setPrevious] = useState(false);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedAnalysisParam, setSelectedAnalysisParam] = useState<string[]>([]);
  const [selectedPossibleDisease, setSelectedPossibleDisease] = useState<string[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedAnalysisParam, setIsClickedAnalysisParam] = useState(false);
  
  const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);
  const columns = analysisParametersList.length < 6 ? 1 : analysisParametersList.length < 11 ? 2 : 3;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const firstCardHistory = patientHistory.slice(0, 4);
  const secondCardHistory = patientHistory.slice(4);

  const [clickedRow, setClickedRow] = useState<{ [key: string]: string } | null>(null);

    // Funkcija koja se poziva kada se klikne na red u tabeli
    const handleRowClick = (row: { [key: string]: string }) => {
        setClickedRow(row); // Ažuriranje stanja sa podacima kliknutog reda
        console.log(row);
    };


  const data = [
    { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123', doktor:'Jovan Savic' },
    { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987',doktor:'Jovan Savic'},
    { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456' ,doktor:'Mina Jovic'},
    // Dodajte više podataka po potrebi
];
const [searchInput, setSearchInput] = useState('');
const inputRefs = useRef<Array<{ value: string } | null>>(Array(analysisParametersList.length).fill(null));


  useEffect(() => {
  }, [selectedAnalysisParam]);

  const handleClick = (symptom: string) => {
    setIsClicked(!isClicked);
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    }
  };
  const handleFormCancel = () => {
    setIsModalVisible(false);
  }

  const handleModalCancelButton = () => {
    setIsModalVisible(false);
  }



  const nextStep = () => {
    setPercent((step + 1) * 25.00);
    setStep((prevStep) => prevStep < 3 ? prevStep + 1 : prevStep);
    setToPercent(percent + 25.00)
    setPrevious(false);
    
  };
 
  const analysisFinished = () => {
    nextStep();
    setIsModalVisible(false);

  };

  const analysisConfirmation = () => {

    const allFieldsEntered = inputRefs.current.every(ref => ref && ref.value.trim() !== '');
    if (allFieldsEntered) {
        setIsModalVisible(true);
        const enteredValues = inputRefs.current.map(ref => ref && ref.value.trim());
        console.log('Unete vrednosti:', enteredValues);
    } else {
        showToast("Niste popunili potrebna polja!");
        console.log('Nisu sva polja uneta.');
    }
      };
  

  return (
    <>
    <Container2 style={{ display: clickedRow ? 'none' : 'block' }}>
    <Title>Laboratorijska diagnostika</Title>
            <SearchContainer>
            <StyledFontAwesomeIcon icon={faSearch} />
            <StyledInputSearch
                type="text"
                placeholder="Search actions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            </SearchContainer>
            <MedicalTable data={data} searchInput={searchInput} onRowClick={handleRowClick}/>
    </Container2>

    <Container style={{ display: clickedRow ? 'block' : 'block' }}>
    
      <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Laboratorijska diagnostika</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content> 
          <MainContent>
            <APContent columns={columns}>
              {analysisParametersList.map((analysisParam, index) => (
                <CardContainer key={index} >
                  <div>
                    <SymptomTitle>{analysisParam}</SymptomTitle>
                  </div>
                  <InputField
                                type="number"
                                placeholder="Vrednost"
                                // Dodajte ref za svako input polje
                                ref={(input) => (inputRefs.current[index] = input)}
                            />  
                </CardContainer>
              ))}
            </APContent>
          </MainContent>
          <ButtonContent>
            <ButtonWrapper>
            </ButtonWrapper>
            <ButtonWrapper>
              <Label>Sledeci korak</Label>
              <Button onClick={analysisConfirmation}>
                <span>&#8594;</span>
              </Button>
            </ButtonWrapper>
          </ButtonContent>
        </Content>
      </Fieldset>
     
    </Container>
      <Modal isVisible={isModalVisible} onClose={handleFormCancel}>
      <div>
      <Message>Da li ste sigurni da želite potvrditi analizu?</Message>
      <ModalButtonContainer>
        <ModalConfirmButton onClick={analysisFinished}>Da</ModalConfirmButton>
        <ModalCancelButton onClick={handleModalCancelButton}>Ne</ModalCancelButton>
      </ModalButtonContainer>
    </div>
      </Modal>
    
    </>
    
  );
};

export default MedicalTechHomePage;
