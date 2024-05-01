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
export const Content = styled.div`
  padding:0 20px;
  margin-top:20px;
`;

export const ButtonContent = styled.div`
display: flex;
justify-content: space-between;
`;
export const MainContent = styled.div`
  min-height:380px;
`;
export const APContent = styled.div<{ columns: number }>`
margin:0 50px;
display: grid;
grid-template-columns: ${({ columns }) => {
  if (columns === 1) return 'auto';
  else if (columns === 2) return '280px 280px';
  else return 'auto auto auto'; // Tri kolone
}};
gap: 1px; /* Razmak između stavki */
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
  width: calc(33.33% - 50px);
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

export const CardContainer2 = styled.div<CardContainerProps>`
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  padding: 12px;
  margin-bottom:8px;
  box-sizing: border-box; 
  display: inline-block;
  vertical-align: top;  
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.superlightblue};
    color:black;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    color: #333333;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
export const SymptomIcon = styled.span`
  margin-right: 5px;
`;
export const SymptomIcon2 = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
export const SymptomTitle = styled.h2`
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom:15px
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.darkblue};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:15px;
  font-weight:700;
`;

export const Label = styled.span`
  margin: 0 5px;
`;

export const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0fbaa7; /* Boja kruga */
  margin-right: 10px;
  padding:2px;
`;
export const MainContentA = styled.div`
margin:0 50px;
display: grid;
grid-template-columns: 1fr 2fr;
gap: 1px; /* Razmak između stavki */
`;

export const HistoryLabel = styled.span`
  margin-top:7px;
  font-weight: bold;
  margin-right: 10px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.superlightblue};
  padding: 10px;
  border-radius: 8px;
  margin-bottom:10px;
`;

export const PatientHistoryList = styled.ul`
  list-style: none;
  padding: 20;
  text-align: left;
`;

export const PatientHistoryItem = styled.li`
  margin-bottom: 5px;
`;

export const DiseaseCard = styled.div<CardContainerProps>`
  background-color: ${(props) => (props.isClicked ? '#0fbaa7' : '#ffffff')};
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  border-radius: 20px;
  padding: 16px;
  margin: 0 auto; /* Centriranje */
  width:60%;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.superlightblue};
    color:black;
  }
  h2 {
    margin: 0;
    font-size: 14px;
    color: ${(props) => (props.isClicked ? '#ffffff' : '#333333')};
  }
`;