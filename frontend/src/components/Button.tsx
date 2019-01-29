import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface ButtonProps {
  onClick?: (ev: React.FormEvent) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  color?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  text,
  datatestid,
  color,
  className,
  disabled,
}: ButtonProps) => {
  const buttonColour = color || 'var(--colour-main-black)';
  const StyledButton = styled('button')`
    background: ${buttonColour};
    width: 200px;
    height: 50px;
    color: #e4e4e4;
    border: 0;
    font-weight: condensed;
    font-size: 24px;
    /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  `;
  return (
    <>
      <StyledButton
        className={className}
        onClick={onClick}
        type='button'
        data-testid={datatestid}
        disabled={disabled}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
