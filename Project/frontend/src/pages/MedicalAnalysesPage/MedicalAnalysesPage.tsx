import React, { useEffect, useState } from 'react';
import { APContent, Button, ButtonContent, ButtonWrapper, Card, CardContainer, CardContainer2, Circle, Container, Content, DiseaseCard, Fieldset, FormTitle, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomIcon2, SymptomTitle, TitleContainer } from './MedicalAnalysesPage.styled';
import { FaCheck } from 'react-icons/fa';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { useLocation, useNavigate } from "react-router-dom";
import { PatientDTO } from '../../models/User';
import { AnalysisParameters, BloodTestRequest, BloodTestResponse, SaveBloodTestRequest, Symptoms } from '../../models/BloodTests';
import ResonerService from '../../services/ResonerService/ResonerService';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import MedicalTableTests from '../../components/MedicalTableTests/MedicalTableTests';



const MedicalAnalysesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient: PatientDTO = location.state.patient;

  const [searchInput, setSearchInput] = useState('');


  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);

  const [patientTests, setPatientTests] = useState<BloodTestResponse[]>(patient.bloodTestAnalyses);
  const [changedTests, setChangedTests] = useState<BloodTestResponse[]>([]);


  const [previous, setPrevious] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)


  const handleFormCancel = () => {
    setIsModalVisible(false);
  }


  const backToPatients = () => {
    navigate("/medical-tech-page");
  };

  const prevStep = () => {
    setPercent((step - 1) * 25.00);
    setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    setToPercent((percent + 25.00))
    setPrevious(true);
  };

  const nextStep = () => {
    setPercent((step + 1) * 25.00);
    setStep((prevStep) => prevStep < 2 ? prevStep + 1 : prevStep);
    setToPercent(percent + 25.00)
    setPrevious(false);
  };


  const handleClickRow = (item: BloodTestRequest) => {
    return;
  };

  const handleValueChange = (item: BloodTestResponse, value: string) => {
    const updatedTests = patientTests.map(test => {
      if (test.id === item.id) {
        return { ...test, value: parseFloat(value) };
      }
      return test;
    });
    setPatientTests(updatedTests);


    const isItemInChangedTests = changedTests.some(test => test.id === item.id);
    if (isItemInChangedTests) {
        const updatedChangedTests = changedTests.map(test => {
            if (test.id === item.id) {
                return { ...test, value: parseFloat(value) };
            }
            return test;
        });
        setChangedTests(updatedChangedTests);
    }else{
      setChangedTests([...changedTests, { ...item, value: parseFloat(value) }]);
    }
  };

  const decisionMaking = () => {
    if (step === 1) {
      setIsModalVisible(true);
    }

  };


  const decisionMakingModal = () => {

    const saveTests : SaveBloodTestRequest = {
      patient: patient.username,
      tests: changedTests
    }

    ResonerService.saveTestResults(saveTests).then(response => {
      setIsModalVisible(false);
      backToPatients()
        }).catch(error => {
      console.error("Error fetching test recommendation: ", error);
    });


  };




  return (
    <>
      <Container>

        <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
          <ProgressBarr percent={(step + 1) * 50.00} previous={previous} toPercent={toPercent} />
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
            {patientTests.filter(test => test.status === 'PENDING').length != 0 && (

              <MedicalTableTests data={patientTests.filter(test => test.status === 'PENDING')} searchInput={searchInput} onRowClick={handleClickRow} handleValueChange={handleValueChange} />
            )}
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
          <ProgressBarr percent={(step + 1) * 50.00} previous={previous} toPercent={toPercent} />
          <StepIndicatorContainer>
            <StepCircle>
              {step + 1}
            </StepCircle>
            <TitleContainer className='TitleN'>
              <FormTitle>Urađene analize krvi</FormTitle>
            </TitleContainer>
          </StepIndicatorContainer>
          <Content>
            <MainContent>
              <div style={{ marginTop: '20px' }}>
                {changedTests.map((test, index) => (
                  <DiseaseCard key={index} isClicked={false}>
                    <SymptomTitle>{test.type}</SymptomTitle>
                    <p>Status: {test.status}</p>
                    <p>Vrednost: {test.value}</p>
                    <p>Datum: {test.date.toString()}</p>
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
                <Label>Završi pregled</Label>
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
          <Message>Da li ste sigurni da želite da sačuvate analize krvis?</Message>
          <ModalButtonContainer>
            <ModalConfirmButton onClick={decisionMakingModal}>Da</ModalConfirmButton>
            <ModalCancelButton onClick={handleFormCancel}>Ne</ModalCancelButton>
          </ModalButtonContainer>
        </div>
      </Modal>

    </>

  );
};

export default MedicalAnalysesPage;
