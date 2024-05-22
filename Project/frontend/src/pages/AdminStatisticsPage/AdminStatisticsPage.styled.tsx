import styled from 'styled-components';

export const StatisticsContainer = styled.div`
    text-align: center;
    margin-bottom:40px;
`;

export const ChartsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const ChartWrapper = styled.div`
    width: 30%;
    
    &:nth-child(2) {
        width: 40%;
    }
`;

