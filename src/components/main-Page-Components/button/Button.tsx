import React from 'react';

interface Iprops {
    onClick: () => void | ((x: string) => void);

    children: string | number;
    className?: string;
}

const Button: React.FC<Iprops> = ({ children, onClick, className }) => {
    return (
        <>
            <button onClick={onClick} className={className}>
                {children}
            </button>
        </>
    );
};

export default Button;
