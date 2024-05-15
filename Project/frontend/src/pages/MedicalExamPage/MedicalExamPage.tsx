import React, { useEffect, useState } from 'react';
import { APContent, Button, ButtonContent, ButtonWrapper, Card, CardContainer, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from './MedicalExamPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { useLocation } from "react-router-dom";
import { PatientDTO } from '../../models/User';
import { BloodTestRequest, BloodTestResponse, SaveBloodTestRequest, Symptoms } from '../../models/BloodTests';
import ResonerService from '../../services/ResonerService/ResonerService';
import { Item } from 'semantic-ui-react';


const possibleDiseases = [
  "Hashimoto Tireoiditis",
  "Reumatoidni artritis"
];

const MedicalExamPage: React.FC = () => {
  const location = useLocation();
  const patient: PatientDTO = location.state.patient;

  const patientHistory = [
    { key: "Ime", value: patient.firstname },
    { key: "Prezime", value: patient.lastname },
    { key: "Datum rođenja", value: patient.birthDate },
    { key: "Visina", value: patient.height + " cm" },
    { key: "Težina", value: patient.weight + " kg" },
    { key: "Krvna grupa", value: patient.bloodType },
    { key: "Prethodne bolesti", value: patient.diagnoses.join(", ") },
    // Dodajte ostale informacije koje želite da prikažete
  ];

  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);

  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptoms[]>([]);
  const [recomendedTests, setRecommendedTests] = useState<BloodTestResponse[]>([]);


  const [selectedAnalysisParam, setSelectedAnalysisParam] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<BloodTestResponse[]>([]);

  const [selectedPossibleDisease, setSelectedPossibleDisease] = useState<string[]>([]);


  const [previous, setPrevious] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedAnalysisParam, setIsClickedAnalysisParam] = useState(false);
  const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);

  const columns = recomendedTests.length < 6 ? 1 : recomendedTests.length < 11 ? 2 : 3;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const firstCardHistory = patientHistory.slice(0, 6);
  const secondCardHistory = patientHistory.slice(6);

  useEffect(() => {
  }, [selectedAnalysisParam]);

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

  const nextStepGetTests = () => {
    setPercent((step + 1) * 25.00);
    setStep((prevStep) => prevStep < 3 ? prevStep + 1 : prevStep);
    setToPercent(percent + 25.00)
    setPrevious(false);

    let request : BloodTestRequest = {
      patient: patient.username,
      symptoms: selectedSymptoms
    }
    ResonerService.getTests(request).then(response => {
      setRecommendedTests(response.data)
    }).catch(error => {
        console.error("Error fetching test recommendation: ", error);
    });

  };


  const decisionMaking = () => {
    // if (step === 2) {
    //   if (selectedSymptoms.length > 0 && selectedAnalysisParam.length > 0) {
    //     setIsModalVisible(true);
    //   } else {
    //     showToast("Niste popunili potrebna polja!");
    //   }
    // }
    // console.log("Odabrani simptomi:", selectedSymptoms);
    // console.log("Odabrane analize:", selectedAnalysisParam);


    let request : SaveBloodTestRequest = {
      patient: patient.username,
      tests: selectedTests
    }
    console.log(request)
    ResonerService.saveTests(request).then(response => {
      console.log(response.data)
    }).catch(error => {
        console.error("Error fetching test recommendation: ", error);
    });

  };
  const diagnosisMaking = () => {
    nextStep();
    setIsModalVisible(false);

  };
  const diagnosiDecision = () => {
    if (selectedPossibleDisease.length == 1) {
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
                {Object.entries(Symptoms).map(([symptomKey, symptomValue], index)  => (
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
                      <SymptomTitle>{test.type}</SymptomTitle>
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
