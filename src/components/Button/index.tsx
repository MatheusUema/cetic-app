import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    display?: 'round' | 'square';
    selected: boolean;
    color?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}


export const Button = ({
    display = 'square', selected, onClick, children, className, color, ...rest
     }: ButtonProps): JSX.Element => {
    return (
       <Container
        {...rest}
        className={className}
        display={display}
        selected={selected}
        onClick={onClick}
        color={color}
       >
            <p>{children}</p>
       </Container>
    );
};
