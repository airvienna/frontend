import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { PropsWithChildren } from 'react';
import { ModalHeaderProps } from '../../Types/modalType';

const ModalHeader = ({ onClick, children }: PropsWithChildren<ModalHeaderProps>) => {
  return (
    <ModalHeaderWrapper>
      <div className="flex items-center justify-center h-8">
        <CloseMark
          onClick={onClick}
          className="flex justify-center items-center rounded-full w-7 h-7 absolute"
        >
          <MdOutlineClose />
        </CloseMark>
        <span className="text-base font-semibold">{children}</span>
      </div>
      <HeaderHr />
    </ModalHeaderWrapper>
  );
};

export default ModalHeader;

const ModalHeaderWrapper = styled.div`
  margin-bottom: 30px;
`;

const CloseMark = styled.div`
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
