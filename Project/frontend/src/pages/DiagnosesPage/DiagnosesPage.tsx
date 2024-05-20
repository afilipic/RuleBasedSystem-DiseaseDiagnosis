// UserHomePage.tsx

import React, { useEffect, useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MainCardContainer, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import StepCard from '../../components/StepCard/StepCard';
import { Button, ButtonContent, ButtonWrapper, Content, DiseaseCard, HistoryLabel, Label, MainContent, SymptomTitle } from '../MedicalExamPage/MedicalExamPage.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';
import { useNavigate } from 'react-router-dom';
import { StyledRoundButton } from '../DoctorHomePage/DoctorHomePage.styled';

const DiagnosesPage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getAllPatients().then(response => {
            setData(response.data);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, [data.length]);
    
    const handleClickRow = (item: PatientDTO) => {
        navigate("/medical-diagnosis", { state: { patient: item } });
    };

    return (    
        <>
        <TableContainer>
            <TableTitle>Dijagnoza</TableTitle>
            <SearchContainer>
                <div></div>
                <div>
                <StyledFontAwesomeIcon icon={faSearch} />
                <StyledInputSearch
                    type="text"
                    placeholder="Search actions"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                </div>
            </SearchContainer>
            {data.length != 0 && (
                <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} />
            )}
        </TableContainer>


    </>


        
    );
};

export default DiagnosesPage;

// <>
//             <TableContainer style={{ display: selectedRow ? 'none' : 'block' }}>
//                 <TableTitle>Diagnoze pacijenata</TableTitle>
//                 <SearchContainer>
//                     <div></div>
//                     <div>
//                     <StyledFontAwesomeIcon icon={faSearch} />
//                     <StyledInputSearch
//                         type="text"
//                         placeholder="Search actions"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                     />
//                     </div>
//                 </SearchContainer>
//                 {/* <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} /> */}
//             </TableContainer>

//             <MainCardContainer style={{ display: selectedRow ? 'flex' : 'none' }}>
//                 <StepCard
//                     step={step}
//                     title="Dijagnoza"
//                     previous={previous}
//                     toPercent={toPercent}
//                     content={content}
//                 />
//             </MainCardContainer>

//         </>
