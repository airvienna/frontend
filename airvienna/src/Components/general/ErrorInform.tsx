import { MdError } from 'react-icons/md';
import { styled } from 'styled-components';

interface ErrorInformProps {
  message: string;
}

const Wrapper = styled.div`
  color: var(--error-color);
  span {
    margin-left: 6px;
  }
`;

const ErrorInform = ({ message }: ErrorInformProps) => {
  return (
    <Wrapper className="flex items-center w-full h-5">
      <div className="text-xs">
        <MdError />
      </div>
      <span className="text-xs">{message}</span>
    </Wrapper>
  );
};

export default ErrorInform;
