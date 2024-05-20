import styled from "styled-components";

export const StyledTable = styled.table`
  margin: 10px;
  width: 98%;
  border-collapse: separate;
  border-spacing: 0 10px; 
  font-size: 15px;
  color: #333333;
  font-weight:bold;
  
  th, td {
    padding: 8px;
    height:35px;
    background-color:white;
  }

  th {
    background-color: ${({ theme }) => theme.colors.superlightblue};
    text-align: center;
    color: ${({ theme }) => theme.colors.lightblue};

  }

  /* Zaobljeni rubovi prvog reda */
  tr td:first-child,
  tr th:first-child {
    border-radius: 20px 0 0 20px;
  }

  /* Zaobljeni rubovi poslednjeg reda */
  tr td:last-child,
  tr th:last-child {
    border-radius: 0 20px 20px 0;
  }

  tbody tr,thead tr {
    margin-bottom: 20px;
    border-radius: 20px; /* Zaobljeni rubovi */
    position: relative; /* Dodajemo relativni položaj za pseudo-element */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
  }



  tbody tr{
    :hover{
      cursor: pointer;
    }
  }
  

 
`;

export const ScrollableContainer = styled.div`
    height: auto;  // Adjust the height as needed
    overflow-y: auto; // Enables scrolling
    overflow-x: hidden;
    width:100%;
`;

export const TableWrapper = styled.div`
 border-radius: 10px
 overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center ;
`;
export const StyledTableRow = styled.tr`
  background-color: white; /* Bijela boja pozadine */
  border-radius: 10px; /* Zaobljeni rubovi */
  margin-bottom: 10px; /* Margina između redova */
`;


