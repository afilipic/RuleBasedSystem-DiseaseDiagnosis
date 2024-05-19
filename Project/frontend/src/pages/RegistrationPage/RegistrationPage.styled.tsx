import styled from "styled-components";
export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 110%;
`;

export const Select = styled.select`
  background-color: #eee;
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  padding: 12px 15px;
  margin: 8px 0;
  width: calc(51% - 10px); /* Polovina širine InputGroup, oduzmi 10 piksela za razmak */
  border-radius: 7px;
`;

export const Input = styled.input`
  background-color: #eee;
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  padding: 12px 15px;
  margin: 6px 0;
  width: 100%; /* Polovina širine InputGroup, oduzmi 10 piksela za razmak */
  border-radius: 7px;
  &.invalidInput {
    border: 1px solid red;
  }
`;

export const DoubleInput = styled.input`
  background-color: #eee;
  border: 1px solid ${({ theme }) => theme.colors.lightblue};
  padding: 12px 15px;
  margin: 6px 0;
  width: calc(41% - 10px); /* Polovina širine InputGroup, oduzmi 10 piksela za razmak */
  border-radius: 7px;
  &.invalidInput {
    border: 1px solid red;
  }
`;

