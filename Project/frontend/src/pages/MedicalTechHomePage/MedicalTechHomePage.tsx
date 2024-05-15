import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonContent, ButtonWrapper, Container, Content, Fieldset, FormTitle, Label, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomTitle, TitleContainer } from '../MedicalExamPage/MedicalExamPage.styled';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton, TableTitle,SearchContainer, StyledFontAwesomeIcon, StyledInputSearch  } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { InputField, CardContainer, MainContent, APContent, Container2 } from './MedicalTechHomePage.styled';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PatientDTO } from '../../models/User';


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

const MedicalTechHomePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedAnalysisParam, setSelectedAnalysisParam] = useState<string[]>([]);
  const [selectedPossibleDisease, setSelectedPossibleDisease] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const [previous, setPrevious] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isClickedAnalysisParam, setIsClickedAnalysisParam] = useState(false);
  const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);

  const columns = analysisParametersList.length < 6 ? 1 : analysisParametersList.length < 11 ? 2 : 3;
  const inputRefs = useRef<Array<{ value: string } | null>>(Array(analysisParametersList.length).fill(null));

  const firstCardHistory = patientHistory.slice(0, 4);
  const secondCardHistory = patientHistory.slice(4);


  const [data, setData] = useState<PatientDTO[]>([]);



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

  const handleClickRow = (item: any) => {
    setSelectedRow(item)
    console.log(item)
  };

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
      <Container2 style={{ display: selectedRow ? 'none' : 'block' }}>
        <TableTitle>Laboratorijska diagnostika</TableTitle>
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
      </Container2>

      <Container style={{ display: selectedRow ? 'flex' : 'none' }}>
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
