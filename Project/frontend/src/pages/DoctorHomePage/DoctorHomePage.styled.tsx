import styled from 'styled-components';
export const StyledRoundButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightblue}; /* Promenite boju prema potrebi */
  color: white;
  width: 40px;
  height: 40px;
  padding:5px;
  font-size:20px;
  margin-left:20px;

  margin-right: 10px; /* Prilagodite razmak između dugmeta i polja za pretragu */
  cursor: pointer;

  transition: transform 0.2s ease; /* Dodajemo prelazni efekat */

  &:hover {
    transform: scale(1.1); /* Povećava dugme na hover */
  }
`;

export const StyledLabel = styled.span`
  margin-right: 10px; /* Prilagodite razmak između labela i polja za pretragu */
`;