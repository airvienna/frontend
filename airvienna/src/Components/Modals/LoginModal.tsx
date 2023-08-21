import { styled } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { SelectArrow } from '../Svgs/SelectArrow';
import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import SnsLoginBtn from '../Oauth/SnsLoginBtn';
import googleImage from '../Imgs/Google.png';

const pdSize = '20px';
const wrapperWidth = '540px';
const inputRadius = '7px';

const LoginModalWrapper = styled.div`
  z-index: 2;
  width: ${wrapperWidth};
  height: 580px;
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(300px);
`;

const CloseMark = styled.div`
  position: absolute;
  left: ${pdSize};
  &:hover {
    background-color: rgb(249 250 251);
    cursor: pointer;
  }
`;

const HeaderHr = styled.div`
  width: ${wrapperWidth};
  height: 1px;
  background-color: rgb(209 213 219);
  margin-left: -${pdSize};
  margin-top: ${pdSize};
`;

const SecondItemWrapper = styled.div`
  padding-top: ${pdSize};
  height: 300px;

  button {
    background-color: var(--main-color);
  }
`;

// Todo : input 눌렀을 때 아래 hr없애기
const InputWrapper = styled.div`
  width: 100%;
  height: 104px;
  position: relative;
  border: 1px solid gray;
  border-radius: ${inputRadius};
  background-color: white;
`;

const FirstSelect = styled.div`
  border-bottom: 1px solid gray;
  width: 100%;

  span {
    left: calc(${pdSize} / 2);
    top: 5px;
  }

  select {
    border-top-left-radius: ${inputRadius};
    border-top-right-radius: ${inputRadius};
    padding-top: 10px;
    padding-left: calc(${pdSize} / 2);
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
      border: 2px solid black;
      outline: none;
      border-radius: ${inputRadius};
    }
  }

  div {
    right: calc(${pdSize} / 2);
    top: 16px;
  }
`;

const SecondInputWrapper = styled.div`
  div {
    width: 14%;
  }
  &:focus-within {
    border: 2px solid black;
    border-radius: ${inputRadius};
  }
`;

const SecondInput = styled.input`
  border-bottom-left-radius: ${inputRadius};
  border-bottom-right-radius: ${inputRadius};
  width: 85%;
  &:focus {
    outline: none;
  }
`;

const SecondTextWrapper = styled.div`
  padding-left: calc(${pdSize} / 2);
`;

const PhoneNumber = styled.span`
  transform: translateX(0) translateY(0) scale(1);
`;

const CountryNumber = styled.span`
  display: none;
`;

const SecondInputOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const MidHr = styled.div`
  width: 45%;
  height: 1px;
  background-color: rgb(209 213 219);
`;

const SnsWrapper = styled.div``;

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [countryNum, setCountryNum] = useState('+82');

  const [phoneNumWrapper, setPhoneNumWrapper] = useAnimate();
  const [countryNumWrapper, setCountryNumWrapper] = useAnimate();

  const [onInput, setOnInput] = useState(false);

  const openInput = () => {
    setOnInput(true);
  };
  const closeInput = () => {
    setOnInput(false);
  };

  useEffect(() => {
    if (!onInput) {
      setPhoneNumWrapper(phoneNumWrapper.current, {
        transform: 'translateX(0) translateY(0) scale(1)',
      });
      setCountryNumWrapper(countryNumWrapper.current, {
        display: 'none',
      });
    } else if (onInput) {
      setPhoneNumWrapper(phoneNumWrapper.current, {
        transform: 'translateX(-15%) translateY(-10%) scale(0.8)',
        marginBottom: '-5px',
      });
      setCountryNumWrapper(countryNumWrapper.current, {
        display: 'block',
      });
    }
  }, [onInput]);

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

  return (
    <>
      {isOpen && (
        <LoginModalWrapper ref={loginAnimate} className="p-5 rounded-xl bg-white">
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

          <SecondItemWrapper className="flex flex-col justify-around w-full">
            <span className="text-xl font-medium">
              에어비엔나에 오신 것을 환영합니다.
            </span>

            <div className="flex flex-col ">
              <InputWrapper>
                <FirstSelect className="h-2/4 flex flex-col relative">
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
                </FirstSelect>

                <SecondInputWrapper
                  onClick={openInput}
                  className="flex h-2/4 items-center relative"
                >
                  <SecondTextWrapper className="flex flex-col justify-center items-start text-gray-500 font-medium">
                    <PhoneNumber ref={phoneNumWrapper}>전화번호</PhoneNumber>
                    <CountryNumber ref={countryNumWrapper} className="text-base">
                      {countryNum}
                    </CountryNumber>
                  </SecondTextWrapper>
                  <SecondInput id="전화번호" className="h-full" />
                </SecondInputWrapper>
              </InputWrapper>
            </div>

            <span style={{ marginTop: '-10px' }} className="text-xs text-gray-800">
              전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터
              요금이 부과됩니다.
              <span className="underline font-medium">개인정보 처리방침</span>
            </span>

            <button className="w-full h-11 rounded-md text-white text-sm">계속</button>
          </SecondItemWrapper>

          <div className="flex items-center justify-between w-full mt-3">
            <MidHr />
            <span className="text-xs text-gray-500">또는</span>
            <MidHr />
          </div>

          <SnsWrapper className="flex flex-col items-center justify-evenly py-3.5">
            <SnsLoginBtn snsName="이메일">
              <HiOutlineMail />
            </SnsLoginBtn>
            <SnsLoginBtn snsName="구글">
              <img src={googleImage} />
            </SnsLoginBtn>
          </SnsWrapper>

          {onInput && <SecondInputOverlay onClick={closeInput} />}
        </LoginModalWrapper>
      )}
    </>
  );
};

export default LoginModal;

const selectData: selectDataProps[] = [
  {
    value: '+358',
    name: '핀란드 (+358)',
  },
  {
    value: '+63',
    name: '필리핀 (+63)',
  },
  {
    value: '+64',
    name: '핏케언 섬 (+64)',
  },
  {
    value: '+82',
    name: '한국 (+82)',
  },
  {
    value: '+36',
    name: '헝가리 (+36)',
  },
];

interface selectDataProps {
  value: string;
  name: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}
