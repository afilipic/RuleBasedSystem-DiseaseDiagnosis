import styled from "styled-components";


export const InputField = styled.input`
  border-radius:15px;
  margin-left:10px;
  width:20px;
`;

export const CardContainer = styled.div`
    display: flex; /* Postavljanje elemenata u isti red */
  background-color: white;
  border-radius: 20px;
  padding: 12px;
  margin-bottom:8px;
  box-sizing: border-box; 
  vertical-align: top;  
  cursor: pointer;

  h2 {
    margin: 0;
    font-size: 14px;
    color: #333333;
  }
  div {
    display: flex;
    align-items: center;
    min-width: 70px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
export const Container2 = styled.div`
width: 70%;
margin: 50px auto;
justify-content: center; /* Centriranje horizontalno */
align-items: center;
`;