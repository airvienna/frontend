import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import LoadingDots from './LoadingDots';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  isLoading?: boolean;
  type?: any;
  isDark?: boolean;
}

interface ButtonWrapperProps {
  $isLoading?: boolean;
  $isDark?: boolean;
}

const Button = ({
  children,
  onClick,
  value,
  isLoading,
  type,
  isDark,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonWrapper
      $isDark={isDark}
      type={type && type}
      $isLoading={isLoading}
      onClick={onClick}
      value={value}
      className="w-full h-11 rounded-md text-gray-800 text-sm flex justify-center items-center"
    >
      {isLoading ? <LoadingDots /> : children}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  z-index: 1;

  min-height: 2.75rem;
  border: 1px solid black;

  background-color: ${({ $isDark }) => ($isDark ? 'black' : 'white')};
  &:hover {
    background-color: ${({ $isDark }) =>
      $isDark ? 'rgb(17 24 39)' : 'rgb(249 250 251)'};
  }
`;
