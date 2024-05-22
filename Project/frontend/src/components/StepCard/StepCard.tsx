import React from "react";
import { Fieldset, FormTitle, ProgressBar, StepCircle, StepIndicatorContainer, TitleContainer } from "./StepCard.styled";

interface StepCardProps<T> {
  step: number;
  title: string;
  previous: boolean;
  toPercent: number;
  content: React.ReactNode;
}

function StepCard<T>({ step,title, previous, toPercent, content }: StepCardProps<T>) {
  return (
    
    <Fieldset step={step}>
      <ProgressBar percent={(step + 1) * 25.00} previous={previous} toPercent={toPercent} />
      <StepIndicatorContainer>
        <StepCircle>
          {step + 1}
        </StepCircle>
        <TitleContainer className='TitleN'>
          <FormTitle>{title}</FormTitle>
        </TitleContainer>
      </StepIndicatorContainer>
      {content}
    </Fieldset>
  );
}

export default StepCard;
