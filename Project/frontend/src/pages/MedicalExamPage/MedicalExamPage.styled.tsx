import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 70%;
  margin: 50px auto;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center; /* Centriranje horizontalno */
  align-items: center;
`;

export const Fieldset = styled.fieldset`
  background: white;
  border: 0 none;
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


export const ProgressBar = styled.ul`
  margin-bottom: 30px;
  overflow: hidden;
  counter-reset: step;

  li {
    list-style-type: none;
    color: white;
    text-transform: uppercase;
    font-size: 9px;
    width: 33.33%;
    float: left;
    position: relative;

    &:before {
      content: counter(step);
      counter-increment: step;
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: block;
      font-size: 10px;
      color: #333;
      background: white;
      border-radius: 50%;
      margin: 0 auto 5px auto;
    }

    &:after {
      content: '';
      width: 100%;
      height: 2px;
      background: white;
      position: absolute;
      left: -50%;
      top: 9px;
      z-index: -1;
    }

    &:first-child:after {
      content: none;
    }

    &.active:before, &.active:after {
      background:  ${({ theme }) => theme.colors.darkblue};;
      color: white;
    }
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

export const ProgressBarr = styled.div<{ percent: number,previous:boolean, toPercent: number }>`
  width: ${({ percent }) => percent}%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  margin-bottom: 8px;
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
export const Content = styled.div`
  padding:0 20px;
  margin-top:20px;
`;
interface CardContainerProps {
  isClicked: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: inline-block;
  background-color: ${(props) => (props.isClicked ? '#0fbaa7' : '#ffffff')};
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  border-radius: 20px;
  padding: 12px;
  margin-right:10px;
  margin-bottom:10px;
  width: calc(33.33% - 40px);
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.superlightblue};
    color:black;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    color: ${(props) => (props.isClicked ? '#ffffff' : '#333333')};
  }
  div {
    display: flex;
    align-items: center;
  }
`;
export const SymptomIcon = styled.span`
  margin-right: 5px;
`;

export const SymptomTitle = styled.h2`
  margin: 0;
`;