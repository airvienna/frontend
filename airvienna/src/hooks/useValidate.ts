import { useState } from 'react';

interface validateStateProps {
  firstName: string;
  lastName: string;
  birth: string;
  email: string;
  phoneNumber: string;
}

export const useValidate = () => {
  const [errors, setErrors] = useState<validateStateProps>({
    firstName: '',
    lastName: '',
    birth: '',
    email: '',
    phoneNumber: '',
  });

  const validateFirstName = (firstName: string) => {
    if (!firstName) {
      setErrors((prev) => ({
        ...prev,
        firstName: '이름을 입력하세요.',
      }));
    } else if (!namePattern.test(firstName)) {
      setErrors((prev) => ({
        ...prev,
        firstName: '이름에 지원되지 않는 문자가 포함되어 있습니다. 다르게 입력해보세요.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        firstName: '',
      }));
    }
  };

  const validateLastName = (lastName: string) => {
    if (!lastName) {
      setErrors((prev) => ({
        ...prev,
        lastName: '성을 입력하세요.',
      }));
    } else if (!namePattern.test(lastName)) {
      setErrors((prev) => ({
        ...prev,
        lastName: '성에 지원되지 않는 문자가 포함되어 있습니다. 다르게 입력해보세요.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lastName: '',
      }));
    }
  };

  const validateBirth = (birth: any) => {
    if (!birth) {
      setErrors((prev) => ({
        ...prev,
        birth: '계속하시려면 생일을 선택하세요.',
      }));
    } else if (birth < minYear || birth > maxYear) {
      setErrors((prev) => ({
        ...prev,
        birth: '생일이 잘못 입력되었습니다.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        birth: '',
      }));
    }
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: '이메일이 필요합니다.',
      }));
    } else if (!emailPattern.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: '이메일을 입력하세요.',
      }));
    } else
      setErrors((prev) => ({
        ...prev,
        email: '',
      }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '전화번호는 필수 항목입니다.',
      }));
    } else if (phoneNumber.length >= 1 && phoneNumber.length < 7) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '전화번호가 너무 짧거나 유효하지 않은 문자를 포함합니다.',
      }));
    } else
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '',
      }));
  };

  return {
    errors,
    validateFirstName,
    validateLastName,
    validateBirth,
    validateEmail,
    validatePhoneNumber,
  };
};

const maxYear = '9999-12-31';
const minYear = '1902-12-31';
const namePattern = /^[a-zA-Z가-힣]{0,8}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{0,4}$/;
