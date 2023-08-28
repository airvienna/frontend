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
  width: 100%;
  height: 20px;

  color: ${({ $grayColor }) => ($grayColor ? '#222222' : 'var(--error-color)')};
  div {
    font-size: 12px;
  }
  span {
    margin-left: 6px;
    font-size: 12px;
  }
`;
const PasswordInform = ({ message, grayColor }: ErrorInformProps) => {
  return (
    <Wrapper $grayColor={grayColor} className="flex items-center">
      <div>
        <AiFillCloseCircle />
      </div>
      <span>{message}</span>
    </Wrapper>
  );
};

export default PasswordInform;
