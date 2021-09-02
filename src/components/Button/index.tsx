import React, { useState,ButtonHTMLAttributes } from 'react';

import { Container, Loader } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    display?: 'round' | 'square';
    selected: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}


export const Button = ({
    display = 'square', selected, onClick, children, className, ...rest
     }: ButtonProps): JSX.Element => {
    const [dataset, setDataset] = useState<any | null>(null);

    return (
       <Container
        {...rest}
        className={className}
        display={display}
        selected={selected}
        onClick={onClick}
       >
            <p>{children}</p>
       </Container>
    );
};
