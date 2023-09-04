import { styled } from 'styled-components';
import { SelectArrow } from '../Svgs/SelectArrow';
import { useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import SnsLoginBtn from '../Oauth/SnsLoginBtn';
import googleImage from '../Imgs/Google.png';
import StyledInput from '../Input/StyledInput';
import { WhiteBgOverlay } from '../Overlays/Overlays';
import ErrorInform from '../general/ErrorInform';
import { selectData } from '../SampleData/LoginSampleData';
import { useNavigation } from 'react-router-dom';
import LoginButton from '../general/LoginButton';
import ModalHeader from './ModalHeader';
import { emailAtom } from '../../atom/emailAtoms';
import { useSetRecoilState } from 'recoil';
import {
  LoginModalProps,
  LoginModalWrapperProps,
  InputWrapperProps,
} from '../../Types/modalType';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { useValidate } from '../../hooks/useValidate';

const LoginModal = ({
  isOpen,
  onClose,
  setVerifiedEmail,
  openEmail,
}: LoginModalProps) => {
  const setNowEmail = useSetRecoilState(emailAtom);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  const [countryNum, setCountryNum] = useState('+82');

  const { errors, validateEmail, validatePhoneNumber } = useValidate();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [loginAnimate, setLoginAnimate] = useAnimate();
  useEffect(() => {
    if (isOpen) {
      setLoginAnimate(loginAnimate.current, {
        transform: 'translateY(0)',
      });
    } else if (isOpen) {
      setLoginAnimate(loginAnimate.current, {
        transform: 'translateY(300px)',
      });
    }
  }, [isOpen]);

  const [onInputModal, setOnInputModal] = useState(false);
  const openInputModal = () => {
    setOnInputModal(true);
  };
  const closeInputModal = () => {
    setOnInputModal(false);
  };

  const [loginWay, setLoginWay] = useState('전화번호');
  const loginWayHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setLoginWay(value);
  };

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    switch (value) {
      case '전화번호':
        validatePhoneNumber(phoneInputRef?.current?.value + '');
        phoneInputRef?.current?.focus();
        break;

      case '이메일':
        if (emailInputRef?.current?.value !== '' && errors.email == '') {
          setNowEmail(emailInputRef?.current?.value + '');
          setVerifiedEmail(true);
          openEmail();
        } else {
          validateEmail(emailInputRef?.current?.value + '');
        }
        break;
    }
  };

  return (
    <>
      {isOpen && (
        <LoginModalWrapper
          $isEmail={loginWay == '이메일'}
          ref={loginAnimate}
          className="p-5 rounded-xl bg-white flex flex-col justify-between inset-x-0 fixed"
        >
          <ModalHeader onClick={() => onClose(false)}>로그인 또는 회원가입</ModalHeader>
          <SecondItemWrapper
            $isEmail={loginWay == '이메일'}
            className="flex flex-col justify-between w-full"
          >
            <span className="text-xl font-medium">
              에어비엔나에 오신 것을 환영합니다.
            </span>

            <div className="flex flex-col">
              {loginWay == '전화번호' && (
                <TwoInputWrapper>
                  <CountrySelectWrapper className="h-2/4 flex flex-col relative w-full">
                    <span className="text-xs absolute text-gray-400">국가/지역</span>
                    <select
                      defaultValue={'+82'}
                      onChange={(e) => setCountryNum(e.target.value)}
                      className="h-full text-slate-900"
                    >
                      {selectData.map(({ value, name }) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute">
                      <SelectArrow />
                    </div>
                  </CountrySelectWrapper>

                  <InputWrapper $error={errors.phoneNumber !== ''}>
                    <StyledInput
                      error={errors.phoneNumber !== ''}
                      InputRef={phoneInputRef}
                      inputType="number"
                      btext="전화번호"
                      countryNum={countryNum}
                      onModal={onInputModal}
                      openModal={openInputModal}
                      onKeyDown={() => {
                        validatePhoneNumber('입력중엔true입니다');
                      }}
                    />
                  </InputWrapper>
                </TwoInputWrapper>
              )}

              {loginWay == '이메일' && (
                <InputWrapper $error={errors.email !== ''}>
                  <StyledInput
                    onChange={(event: any) => validateEmail(event.target.value)}
                    onKeyDown={(event: any) => validateEmail(event.target.value)}
                    inputType="email"
                    onModal={onInputModal}
                    openModal={openInputModal}
                    InputRef={emailInputRef}
                    btext="이메일"
                    isSamebtext={true}
                    error={errors.email !== ''}
                  />
                </InputWrapper>
              )}
            </div>

            {loginWay == '전화번호' && (
              <>
                {errors.phoneNumber !== '' ? (
                  <ErrorInformWrapper>
                    <ErrorInform message={errors.phoneNumber} />
                  </ErrorInformWrapper>
                ) : (
                  <span style={{ marginTop: '-10px' }} className="text-xs text-gray-800">
                    전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및
                    데이터 요금이 부과됩니다.
                    <span className="underline font-medium">개인정보 처리방침</span>
                  </span>
                )}
              </>
            )}

            {loginWay == '이메일' && (
              <>{errors.email !== '' && <ErrorInform message={errors.email} />}</>
            )}

            <LoginButton isLoading={isLoading} value={loginWay} onClick={submitHandler}>
              계속
            </LoginButton>
          </SecondItemWrapper>

          <div className="flex items-center justify-between w-full mt-3">
            <MidHr />
            <span className="text-xs text-gray-500">또는</span>
            <MidHr />
          </div>

          <div className="flex flex-col items-center justify-evenly py-3.5 max-h-60">
            {loginWay == '전화번호' ? (
              <SnsLoginBtn snsName="이메일" onClick={loginWayHandler}>
                <HiOutlineMail />
              </SnsLoginBtn>
            ) : (
              <SnsLoginBtn snsName="전화번호" onClick={loginWayHandler}>
                <MdOutlinePhoneAndroid />
              </SnsLoginBtn>
            )}

            <SnsLoginBtn snsName="구글" onClick={loginWayHandler}>
              <img src={googleImage} />
            </SnsLoginBtn>
          </div>

          {onInputModal && <WhiteBgOverlay onClose={closeInputModal} />}
        </LoginModalWrapper>
      )}
    </>
  );
};

export default LoginModal;

const LoginModalWrapper = styled.div<LoginModalWrapperProps>`
  width: var(--modal-wrapper-width);
  height: ${({ $isEmail }) => ($isEmail ? '480px' : '580px')};
  z-index: 3;

  top: var(--nav-h);
  margin: 0 auto;

  transform: translateY(300px);
`;

const ErrorInformWrapper = styled.div`
  margin-top: -25px;
`;

const SecondItemWrapper = styled.form<LoginModalWrapperProps>`
  height: ${({ $isEmail }) => ($isEmail ? '180px' : '300px')};
`;

const CountrySelectWrapper = styled.div`
  border-bottom: 1px solid gray;

  span {
    left: calc(var(--signup-pdsize) / 2);
    top: 5px;
  }

  select {
    border-top-left-radius: var(--input-radius);
    border-top-right-radius: var(--input-radius);
    padding-top: 10px;
    padding-left: calc(var(--signup-pdsize) / 2);
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
      border: 2px solid black;
      outline: none;
      border-radius: var(--input-radius);
    }
  }

  div {
    right: calc(var(--signup-pdsize) / 2);
    top: 16px;
  }
`;

const MidHr = styled.div`
  width: 45%;
  height: 1px;
  background-color: rgb(209 213 219);
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  height: 52px;
  min-height: 52px;

  z-index: 4;

  border-radius: var(--input-radius);
  border: ${({ $error }) => ($error ? '1px solid var(--error-color)' : '1px solid gray')};
`;

export const TwoInputWrapper = styled.div`
  width: 100%;
  height: 104px;

  z-index: 4;
  border: 1px solid gray;
  border-radius: var(--input-radius);
`;
