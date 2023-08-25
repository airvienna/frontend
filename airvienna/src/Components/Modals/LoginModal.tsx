import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
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
import { useSubmit } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

interface LoginModalWrapperProps {
  $isEmail: boolean;
}

interface InputWrapperProps {
  $error?: boolean;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [countryNum, setCountryNum] = useState('+82');
  const [onInputModal, setOnInputModal] = useState(false);
  const openInputModal = () => {
    setOnInputModal(true);
  };
  const closeInputModal = () => {
    setOnInputModal(false);
  };

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

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const verifyPhoneNumber = () => {
    if (phoneInputRef?.current?.value === '') {
      setPhoneNumberErrorMessage('전화번호는 필수 항목입니다.');
    } else if (
      phoneInputRef?.current?.value &&
      phoneInputRef?.current?.value?.length >= 1 &&
      phoneInputRef?.current?.value?.length < 7
    ) {
      setPhoneNumberErrorMessage(
        '전화번호가 너무 짧거나 유효하지 않은 문자를 포함합니다.'
      );
    } else setPhoneNumberErrorMessage('');
    phoneInputRef?.current?.focus();
  };

  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{0,4}$/;
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const verifyEmail = () => {
    if (emailInputRef?.current?.value === '')
      setEmailErrorMessage('이메일이 필요합니다.');
    else if (!emailPattern.test(emailInputRef?.current?.value + ''))
      setEmailErrorMessage('이메일을 입력하세요.');
    else setEmailErrorMessage('');
  };

  const [loginWay, setLoginWay] = useState('phone');
  const loginWayHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setLoginWay(value);
  };

  const submit = useSubmit();
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    switch (value) {
      case 'phone':
        verifyPhoneNumber();

      case '이메일':
        verifyEmail();
    }
  };
  return (
    <>
      {isOpen && (
        <LoginModalWrapper
          $isEmail={loginWay == '이메일'}
          ref={loginAnimate}
          className="p-5 rounded-xl bg-white flex flex-col justify-between"
        >
          <div className="flex items-center justify-center">
            <CloseMark
              onClick={() => onClose(false)}
              className="flex justify-center items-center rounded-full w-7 h-7"
            >
              <MdOutlineClose />
            </CloseMark>
            <span className="text-sm font-medium">로그인 또는 회원가입</span>
          </div>

          <HeaderHr />

          <SecondItemWrapper
            $isEmail={loginWay == '이메일'}
            className="flex flex-col justify-between w-full"
          >
            <span className="text-xl font-medium">
              에어비엔나에 오신 것을 환영합니다.
            </span>

            <div className="flex flex-col">
              {loginWay == 'phone' && (
                <TwoInputWrapper>
                  <CountrySelectWrapper className="h-2/4 flex flex-col relative">
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

                  <InputWrapper $error={phoneNumberErrorMessage !== ''}>
                    <StyledInput
                      error={phoneNumberErrorMessage !== ''}
                      InputRef={phoneInputRef}
                      inputType="number"
                      btext="전화번호"
                      countryNum={countryNum}
                      onModal={onInputModal}
                      openModal={openInputModal}
                      onKeyDown={() => setPhoneNumberErrorMessage('')}
                    />
                  </InputWrapper>
                </TwoInputWrapper>
              )}

              {loginWay == '이메일' && (
                <InputWrapper $error={emailErrorMessage !== ''}>
                  <StyledInput
                    onKeyDown={verifyEmail}
                    inputType="email"
                    onModal={onInputModal}
                    openModal={openInputModal}
                    InputRef={emailInputRef}
                    btext="이메일"
                    isSamebtext={true}
                    error={emailErrorMessage !== ''}
                  />
                </InputWrapper>
              )}
            </div>

            {loginWay == 'phone' && (
              <>
                {phoneNumberErrorMessage ? (
                  <ErrorInformWrapper>
                    <ErrorInform message={phoneNumberErrorMessage} />
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
              <>{emailErrorMessage && <ErrorInform message={emailErrorMessage} />}</>
            )}

            <button
              value={loginWay}
              onClick={submitHandler}
              className="w-full h-11 rounded-md text-white text-sm"
            >
              계속
            </button>
          </SecondItemWrapper>

          <div className="flex items-center justify-between w-full mt-3">
            <MidHr />
            <span className="text-xs text-gray-500">또는</span>
            <MidHr />
          </div>

          <div className="flex flex-col items-center justify-evenly py-3.5 max-h-60">
            <SnsLoginBtn snsName="이메일" onClick={loginWayHandler}>
              <HiOutlineMail />
            </SnsLoginBtn>
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
  z-index: 2;
  width: var(--wrapper-width);
  height: ${({ $isEmail }) => ($isEmail ? '480px' : '580px')};

  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(300px);
`;

const ErrorInformWrapper = styled.div`
  margin-top: -25px;
`;

const CloseMark = styled.div`
  position: absolute;
  left: var(--signup-pdsize);
  &:hover {
    background-color: rgb(249 250 251);
    cursor: pointer;
  }
`;

const HeaderHr = styled.div`
  width: var(--wrapper-width);
  height: 1px;
  background-color: rgb(209 213 219);
  margin-left: calc(var(--signup-pdsize) * -1);
  margin-top: var(--signup-pdsize);
`;

const SecondItemWrapper = styled.form<LoginModalWrapperProps>`
  padding-top: var(--signup-pdsize);
  height: ${({ $isEmail }) => ($isEmail ? '180px' : '300px')};

  button {
    background-color: var(--main-color);
    z-index: 1;
  }
`;

const CountrySelectWrapper = styled.div`
  border-bottom: 1px solid gray;
  width: 100%;

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

const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  height: 52px;

  border-radius: var(--input-radius);
  border: ${({ $error }) => ($error ? '1px solid var(--error-color)' : '1px solid gray')};
`;

const TwoInputWrapper = styled.div`
  width: 100%;
  height: 104px;

  border: 1px solid gray;
  border-radius: var(--input-radius);
`;
