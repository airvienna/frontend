import { useState } from 'react';

// 에어비엔나 자체 비밀번호 검증 커스텀 훅
export const usePasswordValidate = (firstName: string, email: string) => {
  const [pwCheckError, setPwCheckError] = useState(true);
  const [pwLengthError, setPwLengthError] = useState(true);
  const [pwPatternError, setPwPatternError] = useState(true);

  const verifyPwCheck = (password: string) => {
    if (password === '') {
      setPwCheckError(true);
    } else if (firstName !== '' && password.includes(firstName)) {
      setPwCheckError(true);
    } else if (email && password.includes(email.match(/^[^@]+/) + '')) {
      setPwCheckError(true);
    } else {
      setPwCheckError(false);
    }
  };

  const verifyPwLength = (password: string) => {
    if (password === '') {
      setPwLengthError(true);
    } else if (password.length < 8) {
      setPwLengthError(true);
    } else {
      setPwLengthError(false);
    }
  };

  const verifyPwPattern = (password: string) => {
    if (!passwordPattern.test(password)) {
      setPwPatternError(true);
    } else {
      setPwPatternError(false);
    }
  };

  const verifyPassword = (password: string) => {
    verifyPwCheck(password);
    verifyPwLength(password);
    verifyPwPattern(password);
  };

  return { pwCheckError, pwLengthError, pwPatternError, verifyPassword };
};

const passwordPattern = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
