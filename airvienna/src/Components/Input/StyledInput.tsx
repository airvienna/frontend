import { useAnimate } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface StyledInputProps {
  error: boolean;
  inputType: string;
  InputRef: React.ForwardedRef<HTMLInputElement> | any;
  onModal: boolean;

  max?: any;
  min?: any;

  defaultValue?: string;
  isSamebtext?: boolean;
  btext?: string;
  countryNum?: string;
  tabIndex?: number;

  onChange?: any;
  openModal?: () => void;
  onFocus?: () => void;
  onBlur?: any;
  onKeyDown?: any;
  onInput?: () => void;
}

interface isSamebtextStyledProps {
  $isSamebtext?: boolean;
  $error?: boolean;
  $onBlur?: boolean;
  $notInput?: boolean;
}

const StyledInput = ({
  children,
  error,
  isSamebtext,
  btext,
  countryNum,
  onModal,
  openModal,
  InputRef,
  onKeyDown,
  onChange,
  onInput,
  inputType,
  defaultValue,
  max,
  min,
  tabIndex,
}: PropsWithChildren<StyledInputProps>) => {
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
    } else if (onModal || defaultValue) {
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
        tabIndex={tabIndex ? tabIndex : 0}
        $error={error}
        $onBlur={onBlur}
        $isSamebtext={isSamebtext}
        onClick={openModal}
        className="flex flex-col justify-center w-full h-full"
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
          className="flex justify-start items-center font-normal text-md h-full w-full hidden"
        >
          {!isSamebtext && countryNum && <div>{countryNum}</div>}
          <Input
            max={max && max}
            min={min && min}
            $onBlur={onBlur}
            onBlur={() => setOnBlur(error)}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onInput={onInput}
            type={inputType}
            placeholder={isSamebtext ? btext : ''}
            ref={InputRef}
            defaultValue={defaultValue ? defaultValue : ''}
          />
          <ChildrenWrapper className="absolute text-xs underline">
            {children}
          </ChildrenWrapper>
        </SmallTextWrapper>
      </Wrapper>
    </>
  );
};

export default StyledInput;

const ChildrenWrapper = styled.span`
  right: 30px;
  z-index: 4;

  margin-bottom: 20px;
`;

const Wrapper = styled.div<isSamebtextStyledProps>`
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
  width: 98%;
  height: 85%;
  z-index: 4;

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
  padding-left: calc(var(--signup-pdsize) / 2);

  color: ${({ $notInput }) => ($notInput ? 'var(--input-text-color)' : 'black')};
  div {
    width: 40px;
  }
`;
