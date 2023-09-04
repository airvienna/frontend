import { styled } from 'styled-components';
import ModalHeader from './ModalHeader';
import { InputWrapper, TwoInputWrapper } from './LoginModal';
import StyledInput from '../Input/StyledInput';
import { useEffect, useRef, useState } from 'react';
import { WhiteBgOverlay } from '../Overlays/Overlays';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { emailAtom } from '../../atom/emailAtoms';
import PasswordCheck from '../general/PasswordCheck';
import PasswordInform from '../general/PasswordInform';
import LoginButton from '../general/LoginButton';
import ErrorInform from '../general/ErrorInform';
import {
  ActionFunctionArgs,
  useActionData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import axios from 'axios';
import { isLoginAtom, userNameAtom } from '../../atom/isloginAtom';
import { useValidate } from '../../hooks/useValidate';
import { usePasswordValidate } from '../../hooks/usePasswordValidate';
import { ActionDataType, EmailSignUpModalProps } from '../../Types/modalType';

const { VITE_AIRVIENNA_SERVER } = import.meta.env;
const maxYear = '9999-12-31';

const EmailSignupModal = ({ onClose }: EmailSignUpModalProps) => {
  const nowEmail = useRecoilValue(emailAtom);
  const setIslogin = useSetRecoilState(isLoginAtom);
  const setUsername = useSetRecoilState(userNameAtom);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state == 'submitting';
  const actionData = useActionData() as ActionDataType;

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLength = passwordRef?.current?.value?.length;

  const { errors, validateFirstName, validateLastName, validateBirth, validateEmail } =
    useValidate();

  const { pwCheckError, pwLengthError, pwPatternError, verifyPassword } =
    usePasswordValidate(firstNameRef?.current?.value + '', emailRef?.current?.value + '');

  useEffect(() => {
    if (actionData?.verified) {
      setUsername(firstNameRef?.current?.value.substr(0, 1) + '');
      onClose();
      setIslogin(true);
    } else if (!actionData?.verified) {
      console.log('실패');
    }
  });

  const [privacyError, setPrivacyError] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const handlePrivacy = () => {
    setPrivacy((prev) => !prev);
  };

  const verifyPrivacy = () => {
    if (privacy) setPrivacyError('');
    else setPrivacyError('계속하려면 동의해주세요.');
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

  const [marketing, setMarketing] = useState(false);
  const handleMarketing = () => {
    setMarketing((prev) => !prev);
  };

  const [pwLevelError, setPwLevelError] = useState(true);
  useEffect(() => {
    if (!pwLengthError && !pwPatternError) setPwLevelError(false);
    else setPwLevelError(true);
  }, [pwLengthError, pwPatternError]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    validateFirstName(firstNameRef?.current?.value + '');
    validateLastName(lastNameRef?.current?.value + '');
    validateBirth(birthRef?.current?.value + '');
    validateEmail(emailRef?.current?.value + '');
    verifyPassword(passwordRef?.current?.value + '');
    verifyPrivacy();

    if (
      !errors.firstName &&
      !errors.lastName &&
      !errors.birth &&
      !errors.email &&
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

  const modalStates = [
    { key: '0', state: onFirstName, close: closeFirstName },
    { key: '1', state: onLastName, close: closeLastName },
    { key: '2', state: onBirth, close: closeBirth },
    { key: '3', state: onEmail, close: closeEmail },
    { key: '4', state: onPassword, close: closePassword },
  ];

  return (
    <>
      <EmailSignupModalWrapper
        onSubmit={onSubmit}
        className="p-5 rounded-xl flex flex-col overflow-scroll scroll-hidden box-border bg-white fixed inset-x-0 "
      >
        <ModalHeader onClick={onClose}>회원 가입 완료하기</ModalHeader>

        <div className="my-5">
          <TwoInputWrapper>
            <InputWrapper tabIndex={0}>
              <StyledInput
                onModal={onFirstName}
                openModal={openFirstName}
                onChange={(event: any) =>
                  validateFirstName(event.target.value ? event.target.value : '')
                }
                error={errors.firstName !== ''}
                isSamebtext={true}
                inputType="text"
                InputRef={firstNameRef}
                btext="이름(예: 길동)"
              />
            </InputWrapper>

            <InputWrapper tabIndex={1}>
              <StyledInput
                onModal={onLastName}
                openModal={openLastName}
                onChange={(event: any) =>
                  validateLastName(event.target.value ? event.target.value : '')
                }
                error={errors.lastName !== ''}
                isSamebtext={true}
                inputType="text"
                InputRef={lastNameRef}
                btext="성(예: 홍)"
              />
            </InputWrapper>
          </TwoInputWrapper>
          {!errors.lastName && !errors.firstName && (
            <span className="c-text-gray text-xs">
              정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.
            </span>
          )}
          {!errors.firstName && errors.lastName !== '' && (
            <ErrorInform message={errors.lastName} />
          )}
          {errors.firstName !== '' && <ErrorInform message={errors.firstName} />}
        </div>

        <div className="my2.5">
          <InputWrapper>
            <StyledInput
              onModal={onBirth}
              openModal={openBirth}
              error={errors.birth !== ''}
              isSamebtext={false}
              inputType="date"
              InputRef={birthRef}
              onChange={(event: any) =>
                validateBirth(event.target.value ? event.target.value : '')
              }
              btext="생년월일"
              max={maxYear}
            />
          </InputWrapper>
          {!errors.birth ? (
            <span className="c-text-gray text-xs">
              18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른
              회원에게 공개되지 않습니다.
            </span>
          ) : (
            <ErrorInform message={errors.birth} />
          )}
        </div>

        <div className="my-2.5">
          <InputWrapper>
            <StyledInput
              InputRef={emailRef}
              onModal={onEmail}
              openModal={openEmail}
              error={errors.email !== ''}
              isSamebtext={true}
              inputType="text"
              btext="이메일"
              defaultValue={nowEmail}
              onKeyDown={(event: any) => {
                const emailValue = event.target.value;
                validateEmail(emailValue);
              }}
            />
          </InputWrapper>
          {!errors.email ? (
            <span className="c-text-gray text-xs">
              예약 확인과 영수증을 이메일로 보내드립니다.
            </span>
          ) : (
            <ErrorInform message={errors.email} />
          )}
        </div>

        <div className="my-5">
          <InputWrapper>
            <StyledInput
              onModal={onPassword}
              openModal={openPassword}
              error={false}
              isSamebtext={true}
              inputType={showPw ? 'text' : 'password'}
              btext="비밀번호"
              InputRef={passwordRef}
              onChange={(event: any) =>
                verifyPassword(event?.target.value ? event?.target.value : '')
              }
            >
              <span onClick={handleShowPw} className="cursor-pointer">
                {showPw ? '숨기기' : '표시'}
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
        </div>

        <hr />

        <div className="my-5">
          <div className="flex justify-between">
            <div className="flex flex-col w-10/12 cursor-pointer" onClick={handlePrivacy}>
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

            <input
              className="w-6 h-6"
              type="checkbox"
              checked={privacy}
              onChange={handlePrivacy}
            />
          </div>

          <More>더보기</More>

          {privacyError !== '' && <ErrorInform message={privacyError} />}

          <div className="flex justify-between">
            <div
              className="flex flex-col w-10/12 cursor-pointer"
              onClick={handleMarketing}
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

            <input
              className="w-6 h-6"
              type="checkbox"
              checked={marketing}
              onClick={handleMarketing}
            />
          </div>

          <More>더보기</More>
        </div>

        <hr />

        <div className="my-5">
          <span className="text-sm">
            동의 및 계속하기를 선택하여 에어비엔나&nbsp;
            <PolicyText className="cursor-pointer underline">
              서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관,차별 금지
              정책,개인정보 처리방침
            </PolicyText>
            에 동의합니다.
          </span>
        </div>

        <div className="my-8">
          <LoginButton isLoading={isSubmitting} type={'submit'}>
            동의 및 계속하기
          </LoginButton>
        </div>

        {modalStates.map(
          (modalstate) =>
            modalstate.state && (
              <WhiteBgOverlay key={modalstate.key} onClose={modalstate.close} />
            )
        )}
      </EmailSignupModalWrapper>
    </>
  );
};

export default EmailSignupModal;

const EmailSignupModalWrapper = styled.form`
  height: 880px;
  width: var(--modal-wrapper-width);

  z-index: 3;
  top: calc(var(--nav-h) / 2);
  margin: 0 auto;

  @media screen and (max-height: 850px) {
    height: 580px;
    top: var(--nav-h);
  }
`;

const More = styled.div`
  width: 60px;
  height: 40px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: underline;
  cursor: pointer;

  font-size: 12px;
  font-weight: 500;

  box-sizing: border-box;
  padding: 10px;
  margin-left: -10px;

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const PolicyText = styled.span`
  color: var(--deepblue-color);
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
      url: `${VITE_AIRVIENNA_SERVER}/api/auth/signup`,
      data: { lastName, firstName, birth, email, password },
    });

    if (response.status == 200) return { verified: true, response };
    else return { verified: false };
  } catch {
    return { verified: false };
  }
};
