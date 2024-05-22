import { styled } from "styled-components";

export const CenteredToast = styled.div`
  background-color: ${({theme}) => theme.colors.lightblue};
  color: ${({theme}) => theme.colors.darkblue};
  padding: 16px;
  border-radius: 8px;
  border: 2px solid ${({theme}) => theme.colors.lightblue};
  width: 93%; 
  text-align: center;
  font-weight: bold;
`;