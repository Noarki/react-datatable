import React from 'react';

interface Iprops {
    onClick: () => void;
    children: string;
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
