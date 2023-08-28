import { AiFillCheckCircle } from 'react-icons/ai';
import { styled } from 'styled-components';

interface ErrorInformProps {
  message: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 20px;

  color: var(--check-color);
  div {
    font-size: 12px;
  }
  span {
    margin-left: 6px;
    font-size: 12px;
  }
`;
const PasswordCheck = ({ message }: ErrorInformProps) => {
  return (
    <Wrapper className="flex items-center">
      <div>
        <AiFillCheckCircle />
      </div>
      <span>{message}</span>
    </Wrapper>
  );
};

export default PasswordCheck;
