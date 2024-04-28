import React, { useState } from 'react';
import { Button, ButtonContent, ButtonWrapper, CardContainer, Container, Content, Fieldset, FormTitle, Label, ProgressBar, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomIcon, SymptomTitle, TitleContainer } from './MedicalExamPage.styled';
import { FaCheck } from 'react-icons/fa';

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

const MedicalExamPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [previous, setPrevious] = useState(false);
  const [percent, setPercent] = useState(0);
  const [toPercent, setToPercent] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (symptom: string) => {
    setIsClicked(!isClicked);
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    }
  };

  const nextStep = () => {
    setPercent((step + 1) * 33.33);
    setStep((prevStep) => prevStep < 2 ? prevStep + 1 : prevStep);
    setToPercent(percent + 33.33)
    setPrevious(false);
    console.log("Odabrani simptomi:", selectedSymptoms);

  };

  const prevStep = () => {
    setPercent((step - 1) * 33.33);
    setStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    setToPercent((percent + 33.33))
    setPrevious(true);
  };

  return (
    <Container>
      {/* <ProgressBar>
        <li className={step === 0 || step===1 || step === 2 ? 'active' : ''}>Account Setup</li>
        <li className={step === 1 || step===2 ? 'active' : ''}>Social Profiles</li>
        <li className={step === 2 ? 'active' : ''}>Personal Details</li>
      </ProgressBar> */}

      <Fieldset className="fieldset" style={{ display: step === 0 ? 'block' : 'none' }}>
        <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Simptomi</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
          <div>
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
          </div>
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
        <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Analize krvi</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
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
        <ProgressBarr percent={(step + 1) * 33.33} previous={previous} toPercent={toPercent} />
        <StepIndicatorContainer>
          <StepCircle>
            {step + 1}
          </StepCircle>
          <TitleContainer className='TitleN'>
            <FormTitle>Anamneza</FormTitle>
          </TitleContainer>
        </StepIndicatorContainer>
        <Content>
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

    </Container>
  );
};

export default MedicalExamPage;
