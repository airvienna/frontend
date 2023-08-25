import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface StyledInputProps {
  error: boolean;
  inputType: string;
  InputRef: React.ForwardedRef<HTMLInputElement> | any;

  isSamebtext?: boolean;
  btext?: string;
  stext?: string;
  countryNum?: string;
  onModal?: boolean;
  openModal?: () => void;
  onFocus?: () => void;
  onBlur?: any;
  onKeyDown?: () => void;
}

interface isSamebtextStyledProps {
  $isSamebtext?: boolean;
  $error?: boolean;
  $onBlur?: boolean;
  $notInput?: boolean;
}

const StyledInput = ({
  error,
  isSamebtext,
  btext,
  countryNum,
  onModal,
  openModal,
  InputRef,
  onFocus,
  onKeyDown,
  inputType,
}: StyledInputProps) => {
  const [bigText, setBigText] = useAnimate();
  const [smallText, setSmallText] = useAnimate();

  useEffect(() => {
    if (!onModal && InputRef?.current?.value === '') {
      setBigText(bigText.current, {
        transform: 'translateX(0) translateY(0) scale(1)',
      });
      setSmallText(smallText.current, {
        display: 'none',
      });
    } else if (onModal) {
      setBigText(bigText.current, {
        transform: 'translateX(-10%) translateY(-4%) scale(0.8)',
      });
      setSmallText(smallText.current, {
        display: 'flex',
      });
    }
  }, [onModal]);

  const notInput = InputRef?.current?.value?.length == 0;

  const [onBlur, setOnBlur] = useState(false);

  return (
    <>
      <Wrapper
        $error={error}
        $onBlur={onBlur}
        $isSamebtext={isSamebtext}
        onClick={openModal}
        className="flex flex-col justify-center"
      >
        <BigTextWrapper
          $error={error}
          ref={bigText}
          className="flex justify-start items-center text-gray-500 font-medium"
        >
          {btext}
        </BigTextWrapper>

        <SmallTextWrapper
          $notInput={notInput}
          ref={smallText}
          className="flex justify-start items-center font-normal text-md h-full"
        >
          {!isSamebtext && <div>{countryNum}</div>}
          <Input
            $onBlur={onBlur}
            onBlur={() => setOnBlur(error)}
            onKeyDown={onKeyDown}
            type={inputType}
            placeholder={isSamebtext ? btext : ''}
            ref={InputRef}
          />
        </SmallTextWrapper>
      </Wrapper>
    </>
  );
};

export default StyledInput;

const Wrapper = styled.div<isSamebtextStyledProps>`
  width: 100%;
  height: 100%;

  background-color: ${({ $onBlur }) => ($onBlur ? '#fff8f6' : 'white')};
  border-radius: inherit;
  border: 1px solid ${({ $error }) => ($error ? '#fff8f6' : 'inherit')};

  &:focus-within {
    background-color: white;
    border: ${({ $error }) =>
      $error ? '2px solid var(--error-color)' : '2px solid black'};
    border-radius: var(--input-radius);
  }
`;

const Input = styled.input<isSamebtextStyledProps>`
  width: 100%;
  height: 95%;
  z-index: 1;

  border-bottom-right-radius: var(--input-radius);
  background-color: ${({ $onBlur }) => ($onBlur ? `#fff8f6` : 'white')};

  &:focus {
    outline: none;
    background-color: white;
  }
`;

const BigTextWrapper = styled.div<isSamebtextStyledProps>`
  padding-left: calc(var(--signup-pdsize) / 2);

  color: ${({ $error }) => ($error ? 'var(--error-color)' : 'var(--input-text-color)')};
  font-weight: ${({ $error }) => ($error ? '600' : 'inherit')};
`;

const SmallTextWrapper = styled.div<isSamebtextStyledProps>`
  width: 100%;
  display: none;
  padding-left: calc(var(--signup-pdsize) / 2);

  color: ${({ $notInput }) => ($notInput ? 'var(--input-text-color)' : 'black')};
  div {
    width: 40px;
  }
`;
