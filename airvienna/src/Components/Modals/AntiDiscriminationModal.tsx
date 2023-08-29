import { styled } from 'styled-components';
import MLogo from '../../Nav/svg/MLogo';
import LoginButton from '../general/LoginButton';
import Button from '../general/Button';
import { useSetRecoilState } from 'recoil';
import { isAntiAtom } from '../../atom/isloginAtom';
import { BsChevronRight } from 'react-icons/bs';

const AntiDiscriminationModal = () => {
  const setAntiAtom = useSetRecoilState(isAntiAtom);

  return (
    <>
      <Wrapper className="flex flex-col p-5 rounded-xl justify-between">
        <LogoWrapper>
          <MLogo />
        </LogoWrapper>

        <span className="text-xs font-semibold">에어비엔나 커뮤니티 차별반대 서약</span>

        <BigText className="text-2xl font-semibold">
          에어비엔나는 누구나 어디에서나 우리 집밥처럼 맛있는 비엔나를 먹을 수 있는
          커뮤니티를 지향합니다.
        </BigText>

        <span className="font-normal text-gray-600">
          이를 위해 다음에 동의해 주실 것을 부탁드립니다.
        </span>

        <span className="font-normal text-gray-600">
          가격, 모양, 길이, 종류, 색상, 맛, 유통 기한, 방부 처리 등과 관계없이 에어비엔나
          커뮤니티의 모든 사람을 존중하며 편견이나 선입견 없이 대하는 것에 동의합니다.
        </span>

        <MoreButton className="flex justify-evenly items-center">
          <span>더 알아보기</span>
          <div>
            <BsChevronRight />
          </div>
        </MoreButton>

        <LoginButton onClick={() => setAntiAtom(true)}>동의 및 계속하기</LoginButton>
        <Button onClick={() => setAntiAtom(true)}>거절하기</Button>
      </Wrapper>
    </>
  );
};

export default AntiDiscriminationModal;

const Wrapper = styled.div`
  width: var(--modal-wrapper-width);
  height: 500px;

  position: fixed;
  z-index: 2;

  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;

  border-radius: ;
`;

const LogoWrapper = styled.div`
  color: var(--main-color);
`;

const MoreButton = styled.button`
  width: 100px;
  height: 30px;

  border-radius: 6px;
  border: 1px solid black;

  span {
    text-decoration: underline;
  }

  div {
    font-size: 12px;
  }
`;

const BigText = styled.span`
  width: 95%;
`;
