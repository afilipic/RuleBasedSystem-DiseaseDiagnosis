import React, { useEffect, useState } from 'react';
import { APContent, Button, ButtonContent, ButtonWrapper, Card, CardContainer, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from './MedicalExamPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';

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

const MedicalExamPage: React.FC = () => {
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

  const handleClickAnalysisParam = (analysisParam: string) => {
    setIsClickedAnalysisParam(!isClicked);
    if (!selectedAnalysisParam.includes(analysisParam)) {
      setSelectedAnalysisParam([...selectedAnalysisParam, analysisParam]);
    } else {
      setSelectedAnalysisParam(selectedAnalysisParam.filter(item => item !== analysisParam));
    }
  };

  const handleClickPossibleDisease = (possibleDiseases: string) => {
    setIsClickedPossibleDisease(!isClicked);
    if (!selectedPossibleDisease.includes(possibleDiseases)) {
      setSelectedPossibleDisease([...selectedPossibleDisease, possibleDiseases]);
    } else {
      setSelectedPossibleDisease(selectedPossibleDisease.filter(item => item !== possibleDiseases));
    }
  };
  const nextStep = () => {
    setPercent((step + 1) * 25.00);
    setStep((prevStep) => prevStep < 3 ? prevStep + 1 : prevStep);
    setToPercent(percent + 25.00)
    setPrevious(false);
    
  };
  const decisionMaking = () => {
    if (step === 2) {
      if (selectedSymptoms.length > 0 && selectedAnalysisParam.length > 0) {
        setIsModalVisible(true);
      } else {
        showToast("Niste popunili potrebna polja!");
      }
    }
    console.log("Odabrani simptomi:", selectedSymptoms);
    console.log("Odabrane analize:", selectedAnalysisParam);
  };
  const diagnosisMaking = () => {
    nextStep();
    setIsModalVisible(false);

  };
  const diagnosiDecision = () => {
    if (selectedPossibleDisease.length ==1 ) {
      showToast("Uspjesno ste potvrdili diagnozu!");
    } else {
      showToast("Izaberite jednu diagnozu!");
    }
    console.log("Odabrana diagnoza:", selectedPossibleDisease);

  };
  const prevStep = () => {
    setPercent((step - 1) * 25.00);
    setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    setToPercent((percent + 25.00))
    setPrevious(true);
  };

  return (
    <>
    <Container>

      <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Simptomi</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
          <MainContent>
            <div>
              {symptomsList.map((symptom, index) => (
                <CardContainer key={index} onClick={() => handleClick(symptom)} isClicked={selectedSymptoms.includes(symptom)}>
                  <div>
                    {selectedSymptoms.includes(symptom) && <SymptomIcon><FaCheck /></SymptomIcon>}
                    <SymptomTitle>{symptom}</SymptomTitle>
                  </div>
                </CardContainer>
              ))}
            </div>
          </MainContent>
          <ButtonContent>
            <ButtonWrapper>
            </ButtonWrapper>
            <ButtonWrapper>
              <Label>Sledeci korak</Label>
              <Button onClick={nextStep}>
                <span>&#8594;</span>
              </Button>
            </ButtonWrapper>
          </ButtonContent>
        </Content>
      </Fieldset>

      <Fieldset className="fieldset" style={{ display: step === 1 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Analize krvi</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
          <MainContent>
            <APContent columns={columns}>
              {analysisParametersList.map((analysisParam, index) => (
                <CardContainer2 key={index} onClick={() => handleClickAnalysisParam(analysisParam)} isClicked={selectedAnalysisParam.includes(analysisParam)}>
                  <div>
                    <Circle>
                      {selectedAnalysisParam.includes(analysisParam) && <SymptomIcon2><FaCheck /></SymptomIcon2>}
                    </Circle>
                    <SymptomTitle>{analysisParam}</SymptomTitle>
                  </div>
                </CardContainer2>
              ))}
            </APContent>
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
              <Button onClick={nextStep}>
                <span>&#8594;</span>
              </Button>
            </ButtonWrapper>
          </ButtonContent>
        </Content>
      </Fieldset>

      <Fieldset className="fieldset" style={{ display: step === 2 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Anamneza</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
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
              <Button onClick={decisionMaking}>
                <span>&#8594;</span>
              </Button>
            </ButtonWrapper>
          </ButtonContent>
        </Content>
      </Fieldset>

      <Fieldset className="fieldset" style={{ display: step === 3 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} /> 
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Diagnoza</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
          <MainContent>
          <HistoryLabel>Moguće bolesti:</HistoryLabel>
          <div style={{ marginTop: '20px' }}>
          {possibleDiseases.map((disease, index) => (
            <DiseaseCard key={index} onClick={() => handleClickPossibleDisease(disease)} isClicked={selectedPossibleDisease.includes(disease)}>
              <SymptomTitle>{disease}</SymptomTitle>
            </DiseaseCard>
          ))}
          </div>
          </MainContent>
          <ButtonContent>
            <ButtonWrapper>
            </ButtonWrapper>
            <ButtonWrapper>
              <Label>Zakljuci diagnozu</Label>
              <Button onClick={diagnosiDecision}>
                <span>&#8594;</span>
              </Button>
            </ButtonWrapper>
          </ButtonContent>
        </Content>
      </Fieldset>


    </Container>
      <Modal isVisible={isModalVisible} onClose={handleFormCancel}>
      <div>
      <Message>Da li ste sigurni da želite potvrditi diagnozu?</Message>
      <ModalButtonContainer>
        <ModalConfirmButton onClick={diagnosisMaking}>Da</ModalConfirmButton>
        <ModalCancelButton onClick={handleModalCancelButton}>Ne</ModalCancelButton>
      </ModalButtonContainer>
    </div>
      </Modal>
    
    </>
    
  );
};

export default MedicalExamPage;
