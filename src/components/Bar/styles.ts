import styled from 'styled-components';


export const Container = styled.div`
    text-align: center;
    background-color: #f2f2f2;
    padding: 1.5rem;
    border-radius: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 5px 5px 4px 5px rgba(129,129,129,0.55);

    
    margin: 0 5%;

    & + & {
        margin-top: 2rem;
    }
`;

export const Title = styled.strong`
    font-size: 1rem;
    color: #818181;
`;

export const DataContainer = styled.div`

`;

export const DataOrganizer = styled.div`
    display: flex;
    align-items: center;

`;