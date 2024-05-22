import React, { useEffect, useState } from 'react';
import { APContent, AnamnesisButton, Button, ButtonContent, ButtonWrapper, Card, CardContainer, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from './MedicalDiagnosisPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { useLocation, useNavigate } from "react-router-dom";
import { Diagnosis, EvaluationResult, PatientDTO } from '../../models/User';
import { AnalysisParameters, BloodTestRequest, BloodTestResponse, SaveBloodTestRequest, SaveDiagnosis, Symptoms } from '../../models/BloodTests';
import ResonerService from '../../services/ResonerService/ResonerService';



const MedicalDiagnosisPage: React.FC = () => {
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
    { key: "Prethodne bolesti", value: patient.diagnoses.length > 0 ? patient.diagnoses.map(diagnosis => diagnosis.disease.description || "Ne postoje").join(', ') : "Ne postoje" },
    { key: "Potencijalne bolesti", value: patient.diagnoses.length > 0 ? patient.diagnoses.map(diagnosis => diagnosis.disease.description || "Ne postoje").join(', ') : "Ne postoje" },

    // Dodajte ostale informacije koje želite da prikažete
  ];

  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult>();
  const [anamnesisResult, setAnamnesisResult] = useState<String[]>();

  const [selectedPossibleDisease, setSelectedPossibleDisease] = useState<string>();
  const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);

  const [selectedAnalysisParam, setSelectedAnalysisParam] = useState<string[]>([]);

  const [patientTests, setPatientTests] = useState<BloodTestResponse[]>(patient.bloodTestAnalyses);


  const [previous, setPrevious] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState(false);

  const firstCardHistory = patientHistory.slice(0, 6);
  const secondCardHistory = patientHistory.slice(6);

  useEffect(() => {
  }, [evaluationResult]);


  const handleClickPossibleDisease = (possibleDiseases: string) => {
    setIsClickedPossibleDisease(!isClicked);
    if (selectedPossibleDisease != possibleDiseases) {
      setSelectedPossibleDisease(possibleDiseases);
    } else {
      setSelectedPossibleDisease("");
    }
  }

  const handleFormCancel = () => {
    setIsModalVisible(false);
  }

  const backToPatients = () => {
    navigate("/diagnoses-page");
  };

  const prevStep = () => {
    setPercent((step - 1) * 33.00);
    setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    setToPercent((percent + 33.00))
    setPrevious(true);
  };

  const nextStep = () => {
    setPercent((step + 1) * 33.00);
    setStep((prevStep) => prevStep < 2 ? prevStep + 1 : prevStep);
    setToPercent(percent + 33.00)
    setPrevious(false);
  };


  const nextStepEvaluate = () => {
    var evaluateRequest: SaveBloodTestRequest = {
      patient: patient.username,
      tests: []
    }
    ResonerService.evaluateTests(evaluateRequest).then(response => {
      setEvaluationResult(response.data)
      nextStep()
    }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    });
  };


  const evaluateAnamnesis = () => {
    var evaluateAnamnesis: any = {
      patient: patient.username,
    }
    ResonerService.evaluateAnamnesis(evaluateAnamnesis).then(response => {
      setAnamnesisResult(response.data)
    }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    });
  };


  const decisionMaking = () => {
    if (step === 2) {
      if (!selectedPossibleDisease) {
        alert("Odaberite dijagnozu")
        return;
      }
      setIsModalVisible(true);
    }
  };


  const decisionMakingModal = () => {
    setIsModalVisible(false);

    var diagnosis: SaveDiagnosis = {
      patient: patient.username,
      diagnosisName: selectedPossibleDisease!
    }
    ResonerService.setDiagnoses(diagnosis).then(response => {
      backToPatients();
    }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    })
  };

  const doneTests = patientTests.filter(test => test.status === 'DONE');

  if (doneTests.length === 0) {
    return <p>Nema analiza</p>;
  }


  return (
    <>
      <Container>

        <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
          <ProgressBarr percent={(step + 1) * 33.00} previous={previous} toPercent={toPercent} />
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
          <ProgressBarr percent={(step + 1) * 33.00} previous={previous} toPercent={toPercent} />
          <StepIndicatorContainer>
            <StepCircle>
              {step + 1}
            </StepCircle>
            <TitleContainer className='TitleN'>
              <FormTitle>Nalazi</FormTitle>
            </TitleContainer>
          </StepIndicatorContainer>
          <Content>
            <MainContent>
              <div style={{ marginTop: '20px' }}>
                {doneTests.map((test, index) => (
                  <DiseaseCard key={test.id || index} isClicked={false}>
                    <SymptomTitle>{test.type}</SymptomTitle>
                    <p>Status: {test.status}</p>
                    <p>Vrednost: {test.value}</p>
                    <p>Datum: {new Date(test.date).toLocaleDateString()}</p>
                  </DiseaseCard>
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
                <Label>Evaluiraj nalaze</Label>
                <Button onClick={nextStepEvaluate}>
                  <span>&#8594;</span>
                </Button>
              </ButtonWrapper>
            </ButtonContent>
          </Content>
        </Fieldset>

        <Fieldset className="fieldset" style={{ display: step === 2 ? 'block' : 'none' }}>
          <ProgressBarr percent={(step + 1) * 33.00} previous={previous} toPercent={toPercent} />
          <StepIndicatorContainer>
            <StepCircle>
              {step + 1}
            </StepCircle>
            <TitleContainer className='TitleN'>
              <FormTitle>Evaluacija</FormTitle>
            </TitleContainer>
          </StepIndicatorContainer>
          <Content>
            <MainContent>

              <div style={{ marginTop: '20px' }}>
                {Object.entries(evaluationResult?.evaluation || {}).sort((a, b) => b[1] - a[1]).map((disease, index) => (
                  <DiseaseCard isAnamnesis={anamnesisResult?.includes(disease[0])}

                    key={index} onClick={() => handleClickPossibleDisease(disease[0])} isClicked={selectedPossibleDisease == (disease[0])}>
                    <SymptomTitle>{disease[0]} - {disease[1]}%</SymptomTitle>
                  </DiseaseCard>
                ))}
              </div>
              <div>
                {anamnesisResult && (
                  <div>
                    {anamnesisResult.map((test, index) => (
                      <p>{test}</p>
                    ))}
                  </div>
                )}

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
                <AnamnesisButton onClick={evaluateAnamnesis}>ANAMNZEZA
                </AnamnesisButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <Label>Potvrdi dijagnozu</Label>
                <Button onClick={decisionMaking}>
                  <span>&#8594;</span>
                </Button>
              </ButtonWrapper>
            </ButtonContent>
          </Content>
        </Fieldset>


      </Container>
      <Modal isVisible={isModalVisible} onClose={handleFormCancel}>
        <div>
          <Message>Da li ste sigurni da želite da postavite odabranu dijagnozu?</Message>
          <ModalButtonContainer>
            <ModalConfirmButton onClick={decisionMakingModal}>Da</ModalConfirmButton>
            <ModalCancelButton onClick={handleFormCancel}>Ne</ModalCancelButton>
          </ModalButtonContainer>
        </div>
      </Modal>

    </>

  );
};
export default MedicalDiagnosisPage;



