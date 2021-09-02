import styled, { css } from 'styled-components';

interface ButtonContainerProps {
    display: 'round' | 'square';
    selected: boolean;
  }
  

export const Container = styled.button<ButtonContainerProps>`
    border: none;
    width: 150px;
    border-radius: ${(props) => props.display === 'square' ? '.5rem' : '1rem'};
    min-height: 10px;
    cursor: pointer;

    p {
        font-weight: bold;
        color: white;
        font-size: .7rem;
    }

    background-color: ${(props) => props.selected  ? '#1B8AB2' : '#82C5DE'};

    & + & {
        margin-left: 10px;
    }
`;

export const Loader = styled.div`
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 2s linear infinite;
    margin: 0 auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
