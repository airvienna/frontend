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

const DarkButton = ({
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
      className="w-full h-11 rounded-md text-sm flex justify-center items-center"
    >
      {isLoading ? <LoadingDots /> : children}
    </ButtonWrapper>
  );
};

export default DarkButton;

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  min-height: 2.75rem;
  border: 1px solid black;

  background-color: #222222;
  color: white;

  z-index: 1;

  &:hover {
    background-color: black;
  }
`;
