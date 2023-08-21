import { styled } from 'styled-components';
import { createPortal } from 'react-dom';

const LoginModalWrapper = styled.div`
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.01), -1px -1px 15px rgba(0, 0, 0, 0.1);
  z-index: 2;

  position: absolute;
  right: 0;
  top: 0;
  margin-top: calc(var(--nav-h) - 10px);
  margin-right: var(--p-big);
  @media screen and (max-width: 1440px) {
    margin-right: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    margin-right: var(--p-small);
  }
  @media screen and (max-width: 743px) {
    display: none;
  }

  hr {
    margin-left: -0.75rem;
  }

  div:first-child {
    font-weight: 600;
    color: black;
  }

  div {
    box-sizing: border-box;
    padding-left: 0.75rem;
    margin-left: -0.75rem;
    color: rgb(75 85 99);
    width: 236px;
    height: 22%;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgb(249 250 251);
      cursor: pointer;
    }
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <>
      <LoginModalWrapper className="rounded-xl flex flex-col justify-around items-between box-border p-3 text-sm w-60 h-52 border-2 border-gray-50 bg-white">
        <div>로그인</div>
        <div>회원 가입</div>
        <hr className="w-60" />
        <div>당신의 공간을 에어비엔나하세요</div>
        <div>도움말 센터</div>
      </LoginModalWrapper>
      {createPortal(<Overlay onClick={onClose} />, document.body as HTMLElement)}
    </>
  );
};

export default LoginModal;

interface LoginModalProps {
  onClose: () => void;
}
