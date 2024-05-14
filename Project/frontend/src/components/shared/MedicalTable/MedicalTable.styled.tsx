import styled from "styled-components";


export const StyledTable = styled.table`
  margin: 10px;
  width: 98%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 15px;
  color: #333333;
  font-weight:bold;
  
  th, td {
    border: 1px solid ${({ theme }) => theme.colors.lightblue};
    padding: 8px;
    border-radius: 25px;
    height:35px;
    background-color:white;
  }

  th {
    background-color: ${({ theme }) => theme.colors.superlightblue};
    text-align: center;
    color: ${({ theme }) => theme.colors.lightblue};

  }
  tr {
    margin-bottom: 10px; /* Margina između redova */
  }


  /* Pseudo-element ::before za stvaranje prostora iznad redova */
  tr::before {
    content: '';
    display: block;
    margin-bottom:15px;
    position: absolute;
    top: -10px; /* Postavite prostor iznad reda */
    left: 0;
    right: 0;
    height: 20px; /* Visina prostora */
    border-radius: 15px; /* Zaobljeni rubovi */
    background-color: transparent; /* Transparentna boja */
  } 

  
  tr{
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

export const StyledPagination = styled.div`
    padding: 20px;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center ;
`;



export const StyledTableRow = styled.tr`
  background-color: white; /* Bijela boja pozadine */
  border-radius: 10px; /* Zaobljeni rubovi */
  margin-bottom: 10px; /* Margina između redova */
`;

export const StyledTableCell = styled.td`
  padding: 10px; /* Prostor unutar ćelije */
`;

export const StyledTableHeaderCell = styled.th`
  padding: 10px; /* Prostor unutar zaglavlja */
`;

// Kako bi se promijenile boje pri kliku na zaglavlje, mogli biste dodati dodatne stilove
export const StyledClickableHeaderCell = styled(StyledTableHeaderCell)`
  cursor: pointer; /* Kursor pokazuje da je zaglavlje klikabilno */
  &:hover {
    background-color: lightgray; /* Promijeni boju zaglavlja na hover */
  }
`;
