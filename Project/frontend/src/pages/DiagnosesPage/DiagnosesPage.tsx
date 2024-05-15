// UserHomePage.tsx

import React, { useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MainCardContainer, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import StepCard from '../../components/StepCard/StepCard';
import { Button, ButtonContent, ButtonWrapper, Content, DiseaseCard, HistoryLabel, Label, MainContent, SymptomTitle } from '../MedicalExamPage/MedicalExamPage.styled';
import { showToast } from '../../components/shared/toast/CustomToast';

const DiagnosesPage = () => {
    const data = [
        { ime: 'Ana', prezime: 'Marković', jmbg: '1234567890123', datumIzdavanja: '22.5.2000' },
        { ime: 'Marko', prezime: 'Petrović', jmbg: '9876543210987', datumIzdavanja: '15.10.1998' },
        { ime: 'Jovana', prezime: 'Nikolić', jmbg: '4561237890456', datumIzdavanja: '5.3.2005' },
    ];
    const possibleDiseases = [
        "Hashimoto Tireoiditis",
        "Reumatoidni artritis"
    ];
    const [searchInput, setSearchInput] = useState('');
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [selectedPossibleDisease, setSelectedPossibleDisease] = useState<string[]>([]);
    const [isClickedPossibleDisease, setIsClickedPossibleDisease] = useState(false);

    const [step, setStep] = useState(0);
    const [percent, setPercent] = useState(0);
    const [toPercent, setToPercent] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [previous, setPrevious] = useState(false);

    const handleClickRow = (item: any) => {
        setSelectedRow(item)
        console.log(item)
    };

    const handleClickPossibleDisease = (possibleDiseases: string) => {
        setIsClickedPossibleDisease(!isClicked);
        if (!selectedPossibleDisease.includes(possibleDiseases)) {
            setSelectedPossibleDisease([...selectedPossibleDisease, possibleDiseases]);
        } else {
            setSelectedPossibleDisease(selectedPossibleDisease.filter(item => item !== possibleDiseases));
        }
    };

    const diagnosiDecision = () => {
        if (selectedPossibleDisease.length == 1) {
          showToast("Uspjesno ste potvrdili diagnozu!");
        } else {
          showToast("Izaberite jednu diagnozu!");
        }
        console.log("Odabrana diagnoza:", selectedPossibleDisease);
    
      };
    const content = (
        <Content>
            <MainContent>
                <HistoryLabel>Moguće bolesti:</HistoryLabel>
                <div style={{ marginTop: '20px' }}>
                    {possibleDiseases.map((disease, index) => (
                        <DiseaseCard key={index} onClick={() => handleClickPossibleDisease(disease)} isClicked={selectedPossibleDisease.includes(disease)}>
                            <SymptomTitle>{disease}</SymptomTitle>
                        </DiseaseCard>
                    ))}
                </div>
            </MainContent>
            <ButtonContent>
            <ButtonWrapper>
                <Button>
                  <span>&#8592;</span>
                </Button>
                <Label>Prethodni korak</Label>
              </ButtonWrapper>
                <ButtonWrapper>
                    <Label>Zakljuci diagnozu</Label>
                    <Button onClick={diagnosiDecision}>
                        <span>&#8594;</span>
                    </Button>
                </ButtonWrapper>
            </ButtonContent>
        </Content>
    );
    return (
        <>
            <TableContainer style={{ display: selectedRow ? 'none' : 'block' }}>
                <TableTitle>Diagnoze pacijenata</TableTitle>
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
                {/* <MedicalTable data={data} searchInput={searchInput} onRowClick={handleClickRow} /> */}
            </TableContainer>

            <MainCardContainer style={{ display: selectedRow ? 'flex' : 'none' }}>
                <StepCard
                    step={step}
                    title="Diagnoza"
                    previous={previous}
                    toPercent={toPercent}
                    content={content}
                />
            </MainCardContainer>

        </>
    );
};

export default DiagnosesPage;
