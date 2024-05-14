// UserHomePage.styled.tsx

import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
width: 70%;
margin: 50px auto;
justify-content: center; /* Centriranje horizontalno */
align-items: center;
`;

export const LabelContainer = styled.div`
display: flex;
margin-left:20px;
gap: 140px; /* Ovdje postavljamo razmak između labela */
`;

export const Label = styled.div`

`;
export const Title = styled.h2`
  color: green;
  font-size: 24px;
  margin-bottom: 10px;
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