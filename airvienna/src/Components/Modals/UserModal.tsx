import { styled } from 'styled-components';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { BlackBgOverlay, WhiteBgOverlay } from '../Overlays/Overlays';
import EmailSignupModal from './EmailSignupModal';
import { userModalProps } from '../../Types/modalType';

const UserModal = ({ onClose, setIsOpen }: userModalProps) => {
  const [isLoginopen, setIsLoginopen] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  const openLoginModal = () => {
    setIsLoginopen(true);
  };
  const closeLoginModal = () => {
    setIsLoginopen(false);
    setIsOpen(false);
  };
  const openEmailModal = () => {
    setIsLoginopen(true);
  };

  return (
    <>
      {!isLoginopen && (
        <>
          <UserModalWrapper className="rounded-xl flex flex-col justify-around items-between box-border p-3 text-sm w-60 h-52 border-2 border-gray-50 bg-white absolute top-0 right-0">
            <div onClick={openLoginModal}>로그인</div>
            <div onClick={openLoginModal}>회원 가입</div>
            <hr className="w-60" />
            <div>당신의 공간을 에어비엔나하세요</div>
            <div>도움말 센터</div>
          </UserModalWrapper>

          <WhiteBgOverlay onClose={onClose} />
        </>
      )}
      {isLoginopen && (
        <>
          <LoginModal
            openEmail={openEmailModal}
            isOpen={isLoginopen}
            onClose={closeLoginModal}
            setVerifiedEmail={setVerifiedEmail}
          />
          <BlackBgOverlay onClose={closeLoginModal} />
        </>
      )}

      {verifiedEmail && (
        <>
          <EmailSignupModal onClose={closeLoginModal} />
          <BlackBgOverlay onClose={closeLoginModal} />
        </>
      )}
    </>
  );
};

export default UserModal;

const UserModalWrapper = styled.div`
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.01), -1px -1px 15px rgba(0, 0, 0, 0.1);
  z-index: 3;

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
