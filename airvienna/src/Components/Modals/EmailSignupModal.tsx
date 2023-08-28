import { styled } from 'styled-components';
import ModalHeader from './ModalHeader';
import { InputWrapper, TwoInputWrapper } from './LoginModal';
import StyledInput from '../Input/StyledInput';
import { useEffect, useRef, useState } from 'react';
import { WhiteBgOverlay } from '../Overlays/Overlays';
import { useRecoilState } from 'recoil';
import { emailAtom } from '../../atom/emailAtoms';
import PasswordCheck from '../general/PasswordCheck';
import PasswordInform from '../general/PasswordInform';
import LoginButton from '../general/LoginButton';
import ErrorInform from '../general/ErrorInform';
import {
  ActionFunctionArgs,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import axios from 'axios';

// 시간 나면 검증부분 전부 커스텀 훅으로 리팩토링 하기.

const DefaultURL = `https://port-0-airvienna-fq2r52kllo5ynh9.sel3.cloudtype.app`;

const maxYear = '9999-12-31';
const minYear = '1902-12-31';
const namePattern = /^[a-zA-Z가-힣]{0,8}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{0,4}$/;
const passwordPattern = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

interface EmailSignUpModalProps {
  onClose: () => void;
}

interface ActionDataType {
  verified: boolean;
  response: any;
}

const EmailSignupModal = ({ onClose }: EmailSignUpModalProps) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData() as ActionDataType;
  const submit = useSubmit();

  const [nowEmail, setNowEmail] = useRecoilState(emailAtom);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  let passwordLength = passwordRef?.current?.value?.length;

  useEffect(() => {
    if (actionData?.verified) {
      console.log(actionData?.response);
    } else if (!actionData?.verified) {
      console.log('실패');
    }
  });

  const [firstNameError, setFirstNameError] = useState('');
  const verifyFirstName = () => {
    if (!firstNameRef?.current?.value) setFirstNameError('이름을 입력하세요.');
    else if (!namePattern.test(firstNameRef?.current?.value))
      setFirstNameError(
        '이름에 지원되지 않는 문자가 포함되어 있습니다. 다르게 입력해보세요.'
      );
    else setFirstNameError('');
  };

  const [lastNameError, setLastNameError] = useState('');
  const verifyLastName = () => {
    if (!lastNameRef?.current?.value) setLastNameError('성을 입력하세요.');
    else if (!namePattern.test(lastNameRef?.current?.value))
      setLastNameError(
        '성에 지원되지 않는 문자가 포함되어 있습니다. 다르게 입력해보세요.'
      );
    else setLastNameError('');
  };

  const [birthError, setBirthError] = useState('');
  const verifyBirth = () => {
    if (!birthRef?.current?.value) setBirthError('계속하시려면 생일을 선택하세요.');
    else if (birthRef?.current?.value < minYear || birthRef?.current?.value > maxYear)
      setBirthError('생일이 잘못 입력되었습니다.');
    else setBirthError('');
  };

  const [emailError, setEmailError] = useState('');
  const verifyEmail = () => {
    if (!emailRef?.current?.value) setEmailError('이메일이 필요합니다.');
    else if (!emailPattern.test(emailRef?.current?.value))
      setEmailError('이메일을 입력하세요.');
    else setEmailError('');
  };

  const [pwCheckError, setPwCheckError] = useState(true);
  const verifyPwCheck = () => {
    if (passwordRef?.current?.value == '') setPwCheckError(true);
    else if (
      firstNameRef?.current?.value !== '' &&
      passwordRef?.current?.value.includes(firstNameRef?.current?.value + '')
    )
      setPwCheckError(true);
    else if (
      passwordRef?.current?.value.includes(emailRef?.current?.value.match(/^[^@]+/) + '')
    )
      setPwCheckError(true);
    else setPwCheckError(false);
  };

  const [pwLengthError, setPwLengthError] = useState(true);
  const verifyPwLength = () => {
    if (passwordRef?.current?.value == '') setPwLengthError(true);
    else if (passwordRef?.current?.value !== '' && passwordLength && passwordLength < 8)
      setPwLengthError(true);
    else setPwLengthError(false);
  };

  const [pwPatternError, setPwPatternError] = useState(true);
  const verifyPwPattern = () => {
    if (!passwordPattern.test(passwordRef?.current?.value + '')) setPwPatternError(true);
    else setPwPatternError(false);
  };

  const verifyPassword = () => {
    passwordLength = passwordRef?.current?.value?.length;
    verifyPwCheck();
    verifyPwLength();
    verifyPwPattern();
  };

  const [privacyError, setPrivacyError] = useState('');
  const verifyPrivacy = () => {
    if (!privacy) setPrivacyError('계속하려면 동의해주세요.');
    else setPrivacyError('');
  };

  const [onFirstName, setOnFirstName] = useState(false);
  const openFirstName = () => {
    setOnFirstName(true);
  };
  const closeFirstName = () => {
    setOnFirstName(false);
  };

  const [onLastName, setOnLastName] = useState(false);
  const openLastName = () => {
    setOnLastName(true);
  };
  const closeLastName = () => {
    setOnLastName(false);
  };

  const [onBirth, setOnBirth] = useState(false);
  const openBirth = () => {
    setOnBirth(true);
  };
  const closeBirth = () => {
    setOnBirth(false);
  };

  const [onEmail, setOnEmail] = useState(false);
  const openEmail = () => {
    setOnEmail(true);
  };
  const closeEmail = () => {
    setOnEmail(false);
  };

  const [onPassword, setOnPassword] = useState(false);
  const openPassword = () => {
    setOnPassword(true);
  };
  const closePassword = () => {
    setOnPassword(false);
  };

  const [showPw, setShowPw] = useState(false);
  const handleShowPw = () => {
    setShowPw((prev) => !prev);
  };

  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const [pwLevelError, setPwLevelError] = useState(true);
  useEffect(() => {
    if (!pwLengthError && !pwPatternError) setPwLevelError(false);
    else setPwLevelError(true);
  }, [pwLengthError, pwPatternError]);

  const onSubmit = (event: any) => {
    event.preventDefault();

    verifyFirstName();
    verifyLastName();
    verifyBirth();
    verifyEmail();
    verifyPassword();
    verifyPrivacy();

    if (
      firstNameError === '' &&
      lastNameError === '' &&
      birthError === '' &&
      emailError === '' &&
      privacyError === '' &&
      !pwCheckError &&
      !pwLengthError &&
      !pwLevelError &&
      !pwPatternError
    ) {
      submit(
        {
          lastName: `${lastNameRef?.current?.value}`,
          firstName: `${firstNameRef?.current?.value}`,
          email: `${emailRef?.current?.value}`,
          birth: `${birthRef?.current?.value}`,
          password: `${passwordRef?.current?.value}`,
        },
        { method: 'POST' }
      );
    }
  };

  return (
    <>
      <EmailSignupModalWrapper
        onSubmit={onSubmit}
        className="p-5 rounded-xl flex flex-col overflow-auto"
      >
        <ModalHeader onClick={onClose}>회원 가입 완료하기</ModalHeader>

        <Margin20>
          <TwoInputWrapper>
            <InputWrapper>
              <StyledInput
                onModal={onFirstName}
                openModal={openFirstName}
                onChange={verifyFirstName}
                error={firstNameError !== ''}
                isSamebtext={true}
                inputType="text"
                InputRef={firstNameRef}
                btext="이름(예: 길동)"
              />
            </InputWrapper>

            <InputWrapper>
              <StyledInput
                onModal={onLastName}
                openModal={openLastName}
                onChange={verifyLastName}
                error={lastNameError !== ''}
                isSamebtext={true}
                inputType="text"
                InputRef={lastNameRef}
                btext="성(예: 홍)"
              />
            </InputWrapper>
          </TwoInputWrapper>
          {lastNameError == '' && firstNameError == '' && (
            <span className="c-text-gray text-xs">
              정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.
            </span>
          )}
          {firstNameError == '' && lastNameError !== '' && (
            <ErrorInform message={lastNameError} />
          )}
          {firstNameError !== '' && <ErrorInform message={firstNameError} />}
        </Margin20>

        <Margin10>
          <InputWrapper>
            <StyledInput
              onModal={onBirth}
              openModal={openBirth}
              error={birthError !== ''}
              isSamebtext={false}
              inputType="date"
              InputRef={birthRef}
              onChange={verifyBirth}
              btext="생년월일"
              max={maxYear}
            />
          </InputWrapper>
          {!birthError ? (
            <span className="c-text-gray text-xs">
              18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른
              회원에게 공개되지 않습니다.
            </span>
          ) : (
            <ErrorInform message={birthError} />
          )}
        </Margin10>

        <Margin10>
          <InputWrapper>
            <StyledInput
              InputRef={emailRef}
              onModal={onEmail}
              openModal={openEmail}
              error={emailError !== ''}
              isSamebtext={true}
              inputType="text"
              btext="이메일"
              defaultValue={nowEmail}
              onKeyDown={verifyEmail}
            />
          </InputWrapper>
          {!emailError ? (
            <span className="c-text-gray text-xs">
              예약 확인과 영수증을 이메일로 보내드립니다.
            </span>
          ) : (
            <ErrorInform message={emailError} />
          )}
        </Margin10>

        <Margin20>
          <InputWrapper>
            <StyledInput
              onModal={onPassword}
              openModal={openPassword}
              error={false}
              isSamebtext={true}
              inputType={showPw ? 'text' : 'password'}
              btext="비밀번호"
              InputRef={passwordRef}
              onChange={verifyPassword}
            >
              <span onClick={handleShowPw} className="cursor-pointer">
                표시
              </span>
            </StyledInput>
          </InputWrapper>
          {passwordLength == undefined && (
            <>
              <PasswordInform grayColor={true} message="비밀번호 보안 수준: 약함" />
              <PasswordInform
                grayColor={true}
                message="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
              />
              <PasswordInform grayColor={true} message="최소 8자" />
              <PasswordInform grayColor={true} message="숫자나 기호를 포함하세요." />
            </>
          )}

          {passwordLength !== undefined && (
            <>
              {pwLevelError ? (
                <PasswordInform message="비밀번호 보안 수준: 약함" />
              ) : (
                <PasswordCheck message="비밀번호 보안 수준: 보통" />
              )}
              {pwCheckError ? (
                <PasswordInform message="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다." />
              ) : (
                <PasswordCheck message="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다." />
              )}
              {pwLengthError ? (
                <PasswordInform message="최소 8자" />
              ) : (
                <PasswordCheck message="최소 8자" />
              )}
              {pwPatternError ? (
                <PasswordInform message="숫자나 기호를 포함하세요." />
              ) : (
                <PasswordCheck message="숫자나 기호를 포함하세요." />
              )}
            </>
          )}
        </Margin20>

        <hr />

        <Margin20>
          <div className="flex justify-between">
            <div
              className="flex flex-col w-10/12 cursor-pointer"
              onClick={() => setPrivacy((prev) => !prev)}
            >
              <span className="c-text-lightblack text-xs">
                개인정보 수집 및 이용에 동의합니다.
              </span>
              <span className="text-xs c-text-gray">
                1. 에어비엔나가 수집하는 개인 정보 에어비엔나 플랫폼을 이용하는 데 필요한
                정보 당사는 회원님이 에어비엔나 플랫폼을 이용할 때 회원님의 개인 정보를
                수집합니다. 그렇지 않은 경우, 에어비엔나는 요청하신 서비스를 회원님께
                제공하지 못할 수 있습니다. 이러한 정보에는 다음이 포함됩니다.
              </span>
            </div>

            <CheckBox
              type="checkbox"
              checked={privacy}
              onClick={() => setPrivacy((prev) => !prev)}
            />
          </div>

          <More className="flex justify-center items-center underline cursor-pointer text-xs">
            더보기
          </More>

          {privacyError !== '' && <ErrorInform message={privacyError} />}

          <div className="flex justify-between">
            <div
              className="flex flex-col w-10/12 cursor-pointer"
              onClick={() => setMarketing((prev) => !prev)}
            >
              <span className="c-text-lightblack text-xs">
                마케팅 이메일 수신을 원합니다(선택).
              </span>
              <span className="text-xs c-text-gray">
                에어비엔나 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을
                보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 수신을 거부할 수
                있습니다.
              </span>
            </div>

            <CheckBox
              type="checkbox"
              checked={marketing}
              onClick={() => setMarketing((prev) => !prev)}
            />
          </div>

          <More className="flex justify-center items-center underline cursor-pointer text-xs">
            더보기
          </More>
        </Margin20>

        <hr />

        <Margin20>
          <span className="text-sm">
            동의 및 계속하기를 선택하여 에어비엔나&nbsp;
            <PolicyText>
              서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관,차별 금지
              정책,개인정보 처리방침
            </PolicyText>
            에 동의합니다.
          </span>
        </Margin20>

        <Margin30>
          <LoginButton type={'submit'}>동의 및 계속하기</LoginButton>
        </Margin30>

        {onFirstName && <WhiteBgOverlay onClose={closeFirstName} />}
        {onLastName && <WhiteBgOverlay onClose={closeLastName} />}
        {onBirth && <WhiteBgOverlay onClose={closeBirth} />}
        {onEmail && <WhiteBgOverlay onClose={closeEmail} />}
        {onPassword && <WhiteBgOverlay onClose={closePassword} />}
      </EmailSignupModalWrapper>
    </>
  );
};

export default EmailSignupModal;

const EmailSignupModalWrapper = styled.form`
  height: 880px;
  width: var(--modal-wrapper-width);

  background-color: white;
  position: fixed;
  z-index: 2;

  top: calc(var(--nav-h) / 2);
  left: 0;
  right: 0;
  margin: 0 auto;

  @media screen and (max-height: 850px) {
    height: 580px;
    top: var(--nav-h);
  }
`;

const More = styled.div`
  width: 60px;
  height: 40px;
  font-weight: 500;

  box-sizing: border-box;
  padding: 10px;

  margin-left: -10px;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const PolicyText = styled.span`
  color: var(--deepblue-color);
  text-decoration: underline;

  cursor: pointer;
`;

const Margin30 = styled.div`
  margin: 30px 0px;
`;

const Margin20 = styled.div`
  margin: 20px 0px;
`;

const Margin10 = styled.div`
  margin: 10px 0px;
`;

const CheckBox = styled.input`
  width: 23px;
  height: 23px;
  background-color: black;
`;

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();

  const lastName = data.get('lastName');
  const firstName = data.get('firstName');
  const birth = data.get('birth');
  const email = data.get('email');
  const password = data.get('password');

  try {
    const response = await axios({
      method: 'POST',
      url: `${DefaultURL}/api/auth/signup`,
      data: { lastName, firstName, birth, email, password },
    });

    return { verified: true, response };
  } catch {
    return { verified: false };
  }
};
