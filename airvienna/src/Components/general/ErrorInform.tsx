import { MdError } from 'react-icons/md';
import { styled } from 'styled-components';

interface ErrorInformProps {
  message: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 20px;

  color: var(--error-color);
  div {
    font-size: 12px;
  }
  span {
    margin-left: 6px;
    font-size: 12px;
  }
`;

const ErrorInform = ({ message }: ErrorInformProps) => {
  return (
    <Wrapper className="flex items-center">
      <div>
        <MdError />
      </div>
      <span>{message}</span>
    </Wrapper>
  );
};

export default ErrorInform;
