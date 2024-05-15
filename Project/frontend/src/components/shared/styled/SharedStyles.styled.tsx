import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

export const Message = styled.p`
font-size: 18px;
margin-bottom: 20px;
margin-top:10px;
`;


export const ModalConfirmButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0da08d;
  }
`;

export const ModalCancelButton = styled(ModalConfirmButton)`
  background-color: #e63946;

  &:hover {
    background-color: #c7323c;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: right;
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
  padding: 12px;
  border: 2px solid  ${({ theme }) => theme.colors.secondColor};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.standard};
  margin: 5px;

  &::placeholder, &::placeholder {
    text-align: left;
    font-size: 16px;
  }
`;

export const TableContainer = styled.div`
width: 70%;
margin: 50px auto;
justify-content: center; /* Centriranje horizontalno */
align-items: center;
`;
export const TableTitle = styled.h2`
font-size: 28px;
color: #2C3E50;
margin-bottom: 8px;
font-weight: 600;
display: flex;
align-items: center;
`;

export const MainCardContainer = styled.div`
  width: 70%;
  margin: 50px auto;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center; /* Centriranje horizontalno */
  align-items: center;
`;