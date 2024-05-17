import React, { useEffect, useState } from 'react';
import { APContent, Button, ButtonContent, ButtonWrapper, Card, CardContainer, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from './MedicalExamPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { useLocation, useNavigate } from "react-router-dom";
import { PatientDTO } from '../../models/User';
import { AnalysisParameters, BloodTestRequest, BloodTestResponse, SaveBloodTestRequest, Symptoms } from '../../models/BloodTests';
import ResonerService from '../../services/ResonerService/ResonerService';



const MedicalExamPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient: PatientDTO = location.state.patient;

  const patientHistory = [
    { key: "Ime", value: patient.firstname },
    { key: "Prezime", value: patient.lastname },
    { key: "Datum rođenja", value: patient.birthDate },
    { key: "Visina", value: patient.height + " cm" },
    { key: "Težina", value: patient.weight + " kg" },
    { key: "Krvna grupa", value: patient.bloodType },
    { key: "Prethodne bolesti", value: patient.diagnoses.map(diagnosis => diagnosis.disease.description).join(', ') },
    // Dodajte ostale informacije koje želite da prikažete
  ];

  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);

  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptoms[]>([]);
  const [recomendedTests, setRecommendedTests] = useState<BloodTestResponse[]>([]);


  const [selectedAnalysisParam, setSelectedAnalysisParam] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<BloodTestResponse[]>([]);

  const [patientTests, setPatientTests] = useState<BloodTestResponse[]>(patient.bloodTestAnalyses);


  const [previous, setPrevious] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedAnalysisParam, setIsClickedAnalysisParam] = useState(false);
  const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);

  const columns = recomendedTests.length < 6 ? 1 : recomendedTests.length < 11 ? 2 : 3;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const firstCardHistory = patientHistory.slice(0, 6);
  const secondCardHistory = patientHistory.slice(6);

  useEffect(() => {
  }, [patientTests]);

  const handleClick = (symptom: Symptoms) => {
    setSelectedSymptoms(prevSelectedSymptoms => {
      if (prevSelectedSymptoms.includes(symptom)) {
        return prevSelectedSymptoms.filter(item => item !== symptom);
      } else {
        return [...prevSelectedSymptoms, symptom];
      }
    });
  };


  const handleFormCancel = () => {
    setIsModalVisible(false);
  }

  const handleModalCancelButton = () => {
    setIsModalVisible(false);
    prevStep()
  }

  const handleClickAnalysisParam = (test: BloodTestResponse) => {
    setIsClickedAnalysisParam(!isClicked);
    if (!selectedAnalysisParam.includes(test.type)) {
      setSelectedAnalysisParam([...selectedAnalysisParam, test.type]);
      setSelectedTests([...selectedTests, test])
    } else {
      setSelectedAnalysisParam(selectedAnalysisParam.filter(item => item !== test.type));
      setSelectedTests(selectedTests.filter(item => item !== test))
    }

  };



  const backToPatients = () => {
    navigate("/doctor-home-page");
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



  const nextStepGetTests = () => {
    if (step === 1) {
      if (selectedSymptoms.length == 0) {
        showToast("Odaberite bar jedan simptom!");
        return
      }
    }

    let request: BloodTestRequest = {
      patient: patient.username,
      symptoms: selectedSymptoms
    }
    ResonerService.getTests(request).then(response => {
      setRecommendedTests(response.data)
      nextStep()

    }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    });

  };


  const decisionMaking = () => {
    if (step === 2) {
      if (selectedAnalysisParam.length == 0) {
        setIsModalVisible(true);
      }
    }

    let request: SaveBloodTestRequest = {
      patient: patient.username,
      tests: selectedTests
    }
    ResonerService.saveTests(request).then(response => {
      setPatientTests([...patientTests, ...response.data])
      nextStep()
    }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    });

  };


  const decisionMakingModal = () => {
    nextStep();
    setIsModalVisible(false);
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
                <Button onClick={backToPatients}>
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

        <Fieldset className="fieldset" style={{ display: step === 1 ? 'block' : 'none' }}>
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
                {Object.entries(Symptoms).map(([symptomKey, symptomValue], index) => (
                  <CardContainer key={index} onClick={() => handleClick(symptomKey as Symptoms)} isClicked={selectedSymptoms.includes(symptomKey as Symptoms)}>
                    <div>
                      {selectedSymptoms.includes(symptomKey as Symptoms) && <SymptomIcon><FaCheck /></SymptomIcon>}
                      <SymptomTitle>{symptomValue}</SymptomTitle>
                    </div>
                  </CardContainer>
                ))}
              </div>

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
                <Button onClick={nextStepGetTests}>
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
              <FormTitle>Analize krvi</FormTitle>
            </TitleContainer>
          </StepIndicatorContainer>
          <Content>
            <MainContent>
              <APContent columns={columns}>
                {recomendedTests.map((test, index) => (
                  <CardContainer2 key={index} onClick={() => handleClickAnalysisParam(test)} isClicked={selectedAnalysisParam.includes(test.type)}>
                    <div>
                      <Circle>
                        {selectedAnalysisParam.includes(test.type) && <SymptomIcon2><FaCheck /></SymptomIcon2>}
                      </Circle>
                      <SymptomTitle>{test.type as AnalysisParameters}</SymptomTitle>
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
              <HistoryLabel>Zakazani testovi:</HistoryLabel>
              <div style={{ marginTop: '20px' }}>
                {patientTests.filter(test => test.status === 'PENDING').map((test, index) => (
                  <DiseaseCard key={index} isClicked={false}>
                    <SymptomTitle>{test.type}</SymptomTitle>
                    <p>Status: {test.status}</p>
                    <p>Datum: {test.date.toString()}</p>
                  </DiseaseCard>
                ))}
              </div>
            </MainContent>
            <ButtonContent>
              <ButtonWrapper>
              </ButtonWrapper>
              <ButtonWrapper>
                <Label>Završi pregled</Label>
                <Button onClick={backToPatients}>
                  <span>&#8594;</span>
                </Button>
              </ButtonWrapper>
            </ButtonContent>
          </Content>
        </Fieldset>

      </Container>
      <Modal isVisible={isModalVisible} onClose={handleFormCancel}>
        <div>
          <Message>Niste odabrali krvne analize. Da li ste sigurni da želite da završite pregled?</Message>
          <ModalButtonContainer>
            <ModalConfirmButton onClick={decisionMakingModal}>Da</ModalConfirmButton>
            <ModalCancelButton onClick={handleModalCancelButton}>Ne</ModalCancelButton>
          </ModalButtonContainer>
        </div>
      </Modal>

    </>

  );
};

export default MedicalExamPage;
