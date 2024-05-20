import styled from 'styled-components';

export const StyledRoundButton = styled.button`
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: white;
  width: 40px;
  height: 40px;
  padding: 5px;
  font-size: 20px;
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: width 0.5s ease, background-color 0.3s ease;

  &:hover {
    width: 200px;
    background-color: ${({ theme }) => theme.colors.lightblue};
  }

  &:hover .button-text {
    opacity: 1;
    width: auto; /* Povećavamo širinu teksta da bi se prikazao */
  }
`;

export const ButtonIcon = styled.span`
  position: absolute;
  left: 11px; /* Postavljamo plus simbol na levoj strani dugmeta */
  top: 50%;
  transform: translateY(-50%);
  
`;

export const ButtonText = styled.span`
  opacity: 0;
  position: absolute;
  margin-right:15px;
  left: 40px; /* Pomeramo tekst desno */
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  transition: opacity 0.3s ease, width 0.3s ease; /* Dodajemo tranziciju za širinu teksta */
`;

export const StyledLabel = styled.span`
  margin-right: 20px;
`;
