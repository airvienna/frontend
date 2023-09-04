import { AiFillCloseCircle } from 'react-icons/ai';
import { styled } from 'styled-components';

interface ErrorInformProps {
  message: string;
  grayColor?: boolean;
}

interface WrapperProps {
  $grayColor?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  color: ${({ $grayColor }) => ($grayColor ? '#222222' : 'var(--error-color)')};
  span {
    margin-left: 6px;
  }
`;
const PasswordInform = ({ message, grayColor }: ErrorInformProps) => {
  return (
    <Wrapper $grayColor={grayColor} className="flex items-center w-full h-5">
      <div className="text-xs">
        <AiFillCloseCircle />
      </div>
      <span className="text-xs">{message}</span>
    </Wrapper>
  );
};

export default PasswordInform;
