import React, { ChangeEvent, useEffect, useState } from 'react';
import MedicalTable from '../../components/MedicalTable/MedicalTable';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonIcon, ButtonText, SearchContainer, StyledFontAwesomeIcon, StyledInputSearch, StyledRoundButton, TableContainer, TableTitle } from '../../components/shared/styled/SharedStyles.styled';
import UserService from '../../services/UserService/UserService';
import { PatientDTO } from '../../models/User';
import { Button, ButtonContent, ButtonWrapper, Card, Content, HistoryLabel, Label, MainContent, MainContentA, PatientHistoryItem, PatientHistoryList } from '../MedicalExamPage/MedicalExamPage.styled';
import { CustomButton } from '../HomePage/HomePage.styled';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { ChartWrapper, ChartsContainer, StatisticsContainer } from './AdminStatisticsPage.styled';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);



const AdminStatisticsPage = () => {
    const [data, setData] = useState<PatientDTO[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [diagnosisCounts, setDiagnosisCounts] = useState<{ [key: string]: number }>({});
    const navigate = useNavigate();


    useEffect(() => {
        UserService.getAllPatients().then(response => {
            setData(response.data);
            console.log(response.data);
            const diagnosisMap: { [key: string]: number } = {};
            response.data.forEach((patient: { diagnoses: any[]; }) => {
                patient.diagnoses.forEach(diagnosis => {
                    if (diagnosisMap[diagnosis.disease.description]) {
                        diagnosisMap[diagnosis.disease.description]++;
                    } else {
                        diagnosisMap[diagnosis.disease.description] = 1;
                    }
                });
            });
            setDiagnosisCounts(diagnosisMap);
        }).catch(error => {
            console.error("Error fetching real estates: ", error);
        });
    }, []);


    const handleClickRow = (item: PatientDTO) => {
        console.log("Admin pregled")
    };

    const diagnosisLabels = Object.keys(diagnosisCounts);
    const diagnosisData = Object.values(diagnosisCounts);
    const doughnutData = {
        labels: diagnosisLabels,
        datasets: [
            {
                label: 'Broj dijagnoza',
                data: diagnosisData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: diagnosisLabels,
        datasets: [
            {
                label: 'Broj dijagnoza',
                data: diagnosisData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
   
    return (
        <>
          <StatisticsContainer>
            <h2>Statistika dijagnoza</h2>
            <ChartsContainer>
                <ChartWrapper>
                    <Doughnut data={doughnutData} />
                </ChartWrapper>
                <ChartWrapper>
                    <Bar data={barData} />
                </ChartWrapper>
            </ChartsContainer>
        </StatisticsContainer>


        </>

    );
};

export default AdminStatisticsPage;
