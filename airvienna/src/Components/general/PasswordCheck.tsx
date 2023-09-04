import { AiFillCheckCircle } from 'react-icons/ai';
import { styled } from 'styled-components';

interface ErrorInformProps {
  message: string;
}

const Wrapper = styled.div`
  color: var(--check-color);
  span {
    margin-left: 6px;
  }
`;
const PasswordCheck = ({ message }: ErrorInformProps) => {
  return (
    <Wrapper className="flex items-center w-full h-5">
      <div className="text-xs">
        <AiFillCheckCircle />
      </div>
      <span className="text-xs">{message}</span>
    </Wrapper>
  );
};

export default PasswordCheck;
