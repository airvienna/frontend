import { styled } from 'styled-components';
import { PropsWithChildren } from 'react';

const Wrapper = styled.button`
  border: 1px solid black;
  border-radius: 8px;

  &:hover {
    background-color: rgb(249 250 251);
    cursor: pointer;
  }
`;

const Icon = styled.div`
  left: 20px;

  width: 30px;
  height: 30px;
`;

interface SnsLoginProps {
  snsName: string;
  onClick: (event: any) => void;
}

const SnsLoginBtn = ({
  children,
  snsName,
  onClick,
}: PropsWithChildren<SnsLoginProps>) => {
  return (
    <Wrapper
      onClick={(e) => onClick(e)}
      value={snsName}
      className="my-3 bg-white w-full h-12 px-2 flex box-border justify-center items-center relative box-border p-px"
    >
      <Icon className="absolute text-xl flex justify-center items-center">
        {children}
      </Icon>
      <span className="text-sm">{snsName}로 로그인하기</span>
    </Wrapper>
  );
};

export default SnsLoginBtn;
