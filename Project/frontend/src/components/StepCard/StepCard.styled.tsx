import styled, { keyframes } from "styled-components";

export const Fieldset = styled.fieldset<{ step: number }>`
    display: ${({ step }) => (step === 0 ? 'block' : 'none')};
  background: white;
  border: 0 none;
  min-height:530px;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 0;
  box-sizing: border-box;
  width: 80%;
  margin: 0
  position: relative;

  input, textarea {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    color: #2C3E50;
    font-size: 13px;
  }

  .action-button {
    width: 100px;
    background:  ${({ theme }) => theme.colors.superlightblue};;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 1px;
    cursor: pointer;
    padding: 10px;
    margin: 10px 5px;
    text-decoration: none;
    font-size: 14px;
  }

  .action-button:hover, .action-button:focus {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
  }

  .fs-title {
    font-size: 15px;
    text-transform: uppercase;
    color: #2C3E50;
    margin-bottom: 10px;
  }

  .fs-subtitle {
    font-weight: normal;
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
  }
`;

const fillAnimationNext = (fromPercent: number, toPercent: number) => keyframes`
  from { width: ${fromPercent}%; }
  to { width: ${toPercent}%; }
`;

const fillAnimationPrevious = (fromPercent: number, toPercent: number) => keyframes`  
  from { width: ${fromPercent}%; }
  to { width: ${toPercent}%; }
`;

export const ProgressBar = styled.div<{ percent: number,previous:boolean, toPercent: number }>`
  width: ${({ percent }) => percent}%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  margin-bottom: 22px;
  animation: ${({ percent, previous,toPercent }) => (previous ? fillAnimationPrevious(toPercent, percent) : fillAnimationNext(toPercent, percent))} 0.5s ease-out forwards;
  `;

  export const StepIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  margin-left: 10px;
`;

export const TitleContainer = styled.div`
  margin-left: 15px;
 
`;

export const FormTitle = styled.div`
    font-size: 28px;
    color: #2C3E50;
    margin-bottom: 8px;
    font-weight:600;
`;