// UserHomePage.styled.tsx

import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
width: 70%;
margin: 50px auto;
justify-content: center; /* Centriranje horizontalno */
align-items: center;
`;
export const Container1 = styled.div`
  width: 70%;
  margin: 50px auto;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center; /* Centriranje horizontalno */
  align-items: center;
  background-color:white;
`;

export const LabelContainer = styled.div`
display: flex;
margin-left:20px;
gap: 140px; /* Ovdje postavljamo razmak između labela */
`;

export const Label = styled.div`

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

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  font-size: large;
`;
export const SearchContainer = styled.div`
display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right:20px
`;

export const StyledInputSearch = styled.input`
  width: 170px;
  padding: 8px;
  border: 2px solid  ${({ theme }) => theme.colors.secondColor};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.standard};
  margin: 5px;

  &::placeholder, &::placeholder {
    text-align: left;
    font-size: 16px;
  }
`;
export const Title = styled.h2`
font-size: 28px;
color: #2C3E50;
margin-bottom: 8px;
font-weight: 600;
display: flex;
align-items: center;
`;
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
  width: 50%; /* Ovo će omogućiti da se kartica uklopi u kontejner */
  padding: 15px 20px; /* Padding zaobljenja */
  border-radius: 15px; /* Zaobljeni rubovi */
  background-color: ${({ theme }) => theme.colors.superlightblue};; /* Boja pozadine */
  margin-bottom:10px;
`;

export const Data = styled.span`
  margin-right: 10px;
`;