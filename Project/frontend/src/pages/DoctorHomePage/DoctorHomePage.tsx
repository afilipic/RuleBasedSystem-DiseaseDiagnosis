import React, { useEffect,useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';

const DoctorHomePage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    useEffect(() => {
        UserService.getAllPatients().then(response => {
            console.log(response.data)
            setData(response.data);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, [data.length]);


    const handleClickRow = (item: PatientDTO) => {
        setSelectedRow(item)
        console.log(item)
    }; 
    return (
        <>
        <TableContainer>
            <TableTitle>Pacijenti</TableTitle>
            <SearchContainer>
            <StyledFontAwesomeIcon icon={faSearch} />
            <StyledInputSearch
                type="text"
                placeholder="Search actions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            </SearchContainer>
            {data.length != 0 && (
                <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} />
            ) }            
        </TableContainer>        
        
        </>
        
    );
};

export default DoctorHomePage;
