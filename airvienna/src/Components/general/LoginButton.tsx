import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import LoadingDots from './LoadingDots';

interface LoginButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  isLoading?: boolean;
  type?: any;
}

interface LoginButtonWrapperProps {
  $isLoading?: boolean;
}

const LoginButton = ({
  children,
  onClick,
  value,
  isLoading,
  type,
}: PropsWithChildren<LoginButtonProps>) => {
  return (
    <LoginButtonWrapper
      type={type && type}
      $isLoading={isLoading}
      onClick={onClick}
      value={value}
      className="w-full h-11 rounded-md text-white text-sm flex justify-center items-center"
    >
      {isLoading ? <LoadingDots /> : children}
    </LoginButtonWrapper>
  );
};

export default LoginButton;

const LoginButtonWrapper = styled.button<LoginButtonWrapperProps>`
  min-height: 2.75rem;

  background-color: ${({ $isLoading }) =>
    $isLoading ? 'var(--color-gray-400)' : 'var(--main-color)'};
  z-index: 1;
`;
