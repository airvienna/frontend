import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { PropsWithChildren } from 'react';

interface ModalHeaderProps {
  onClick: () => void;
}

const ModalHeader = ({ onClick, children }: PropsWithChildren<ModalHeaderProps>) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <CloseMark
          onClick={onClick}
          className="flex justify-center items-center rounded-full w-7 h-7"
        >
          <MdOutlineClose />
        </CloseMark>
        <span className="text-base font-semibold">{children}</span>
      </div>
      <HeaderHr />
    </>
  );
};

export default ModalHeader;

const CloseMark = styled.div`
  position: absolute;
  left: var(--signup-pdsize);
  &:hover {
    background-color: rgb(249 250 251);
    cursor: pointer;
  }
`;

export const HeaderHr = styled.div`
  width: var(--modal-wrapper-width);
  height: 1px;
  background-color: rgb(209 213 219);
  margin-left: calc(var(--signup-pdsize) * -1);
  margin-top: var(--signup-pdsize);
`;
