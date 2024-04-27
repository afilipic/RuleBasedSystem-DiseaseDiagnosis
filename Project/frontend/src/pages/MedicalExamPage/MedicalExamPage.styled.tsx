import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  text-align: center;
  position: relative;
`;

export const Fieldset = styled.fieldset`
  background: white;
  border: 0 none;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;
  position: relative;

  input, textarea {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 13px;
  }

  .action-button {
    width: 100px;
    background:  ${({ theme }) => theme.colors.lightblue};;
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
      background:  ${({ theme }) => theme.colors.lightblue};;
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
  height: 5px;
  background-color: blue;
  margin-bottom: 20px;
  animation: ${({ percent, previous,toPercent }) => (previous ? fillAnimationPrevious(percent, toPercent) : fillAnimationNext(toPercent, percent))} 0.5s ease-out forwards;
  `;