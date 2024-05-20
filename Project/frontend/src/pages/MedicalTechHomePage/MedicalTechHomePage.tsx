import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonContent, ButtonWrapper, Content, Fieldset, FormTitle, Label, ProgressBarr, StepCircle, StepIndicatorContainer, SymptomTitle, TitleContainer } from '../MedicalExamPage/MedicalExamPage.styled';
import Modal from '../../components/shared/modal/Modal';
import { Message, ModalButtonContainer, ModalCancelButton, ModalConfirmButton, TableTitle, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, MainCardContainer, TableContainer } from '../../components/shared/styled/SharedStyles.styled';
import { showToast } from '../../components/shared/toast/CustomToast';
import { InputField, CardContainer, MainContent, APContent, Container2 } from './MedicalTechHomePage.styled';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PatientDTO } from '../../models/User';
import StepCard from '../../components/StepCard/StepCard';
import { Container } from '../HomePage/HomePage.styled';
import UserService from '../../services/UserService/UserService';
import { useNavigate } from 'react-router-dom';
import { StyledRoundButton } from '../DoctorHomePage/DoctorHomePage.styled';


const MedicalTechHomePage: React.FC = () => {
  const [data, setData] = useState<PatientDTO[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    UserService.getAllPatients().then(response => {
      const filteredData: PatientDTO[] = response.data.filter((patient: PatientDTO) =>
        patient.bloodTestAnalyses.some(test => test.status === 'PENDING')
    );
    setData(filteredData); 
  }).catch(error => {
      console.error("Error fetching real estates: ", error);
    });
  }, [data.length]);

  const handleClickRow = (item: PatientDTO) => {
    navigate("/patient-analyses", { state: { patient: item } });
  };


  return (

    <>
      <TableContainer>
        <TableTitle>Pacijenti</TableTitle>
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
          <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow}  />
        )}
      </TableContainer>


    </>

  );
};

export default MedicalTechHomePage;
