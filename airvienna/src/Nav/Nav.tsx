import styled from 'styled-components';
import MLogo from './svg/MLogo';
import { HiSearch } from 'react-icons/hi';
import Switch from './svg/Switch';
import Word from './svg/Word';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import UserModal from '../Components/Modals/UserModal';
import { useRecoilValue } from 'recoil';
import { isAntiAtom, isLoginAtom, userNameAtom } from '../atom/isloginAtom';
import AntiDiscriminationModal from '../Components/Modals/AntiDiscriminationModal';
import { BlackBgOverlay } from '../Components/Overlays/Overlays';
import AddProfileModal from '../Components/Modals/AddProfileModal';
import Slider from './Slider';

const Nav = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);

  const openUserModal = () => {
    setIsOpenUser(true);
  };
  const closeUserModal = () => {
    setIsOpenUser(false);
  };

  const [antiOverlay, setAntiOverlay] = useState(false);

  const closeAntiModal = () => {
    setAntiOverlay(false);
  };

  const isLogin = useRecoilValue(isLoginAtom);
  const isAnti = useRecoilValue(isAntiAtom);
  const userName = useRecoilValue(userNameAtom);

  // 프로필 생성하기 임시
  const [onOpen, setOnOpen] = useState(false);

  return (
    <Wrapper className="fixed">
      <NavWrapper className="w-full box-border flex items-center justify-between bg-white">
        <FirstItemWrapper>
          <BLogoWrapper className="flex justify-start items-center gap-1 text-2xl font-medium cursor-pointer">
            <MLogo />
            <span>airvienna</span>
          </BLogoWrapper>
          <MLogoWrapper className="cursor-pointer">
            <MLogo />
          </MLogoWrapper>
        </FirstItemWrapper>

        <SecondItemWrapper className="ml-5">
          <BigInput className="box-border flex justify-between items-center rounded-full px-5">
            <div className="text-xl flex items-center w-full cursor-pointer">
              <HiSearch />
              <div className="flex flex-col ml-2.5">
                <span className="text-sm font-semibold">어디든지</span>
                <span className="text-xs text-gray-400">언제든 일주일 • 게스트 추가</span>
              </div>
            </div>

            <SwitchWrapper className="text-xl h-9 w-9 rounded-3xl flex justify-center items-center cursor-pointer">
              <Switch />
            </SwitchWrapper>
          </BigInput>

          <SmallInputWrapper className="w-80 h-14 pt-1.5">
            <SmallInput className="flex items-center justify-between text-sm px-2 max-w-full rounded-full">
              <div className="font-semibold ml-4 cursor-pointer">어디든지</div>
              <span className="h-6 w-px"></span>
              <div className="font-semibold cursor-pointer">언제든 일주일</div>
              <span className="h-6 w-px"></span>
              <div className="text-gray-400 cursor-pointer">게스트 추가</div>
              <SmallInputSearch className="flex justify-center items-center text-base font-semibold cursor-pointer w-8 h-8 rounded-full text-white">
                <HiSearch />
              </SmallInputSearch>
            </SmallInput>
          </SmallInputWrapper>
        </SecondItemWrapper>

        <ThirdItemWrapper className="flex items-center justify-end max-w-lg ml-4 h-11 whitespace-nowrap relative">
          <div className="flex justify-center items-center h-full w-52 rounded-3xl">
            <span className="text-sm font-semibold">당신의 공간을 에어비엔나하세요</span>
          </div>

          <div className="flex justify-center items-center w-12 h-full rounded-3xl">
            <Word />
          </div>

          <div
            onClick={openUserModal}
            className="flex items-center justify-evenly h-full rounded-3xl w-20 cursor-pointer"
          >
            <FaBars />
            <label className="text-3xl cursor-pointer">
              {isLogin ? (
                <LoginUserIcon className="flex justify-center items-center w-8 h-8 rounded-2xl">
                  <span className="text-xs text-white">{userName}</span>
                </LoginUserIcon>
              ) : (
                <FaUserCircle />
              )}
            </label>
          </div>
        </ThirdItemWrapper>

        {isOpenUser && <UserModal setIsOpen={setIsOpenUser} onClose={closeUserModal} />}
      </NavWrapper>

      {isLogin && !isAnti && (
        <>
          <AntiDiscriminationModal />
          <BlackBgOverlay onClose={closeAntiModal} />
        </>
      )}

      {isLogin && isAnti && !onOpen && (
        <>
          <AddProfileModal onClose={setOnOpen} />
          <BlackBgOverlay onClose={closeAntiModal} />
        </>
      )}

      <Slider />
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.div`
  inset: 0;
`;

const NavWrapper = styled.div`
  height: var(--nav-h);
  padding-inline-start: var(--p-big);
  padding-inline-end: var(--p-big);
  @media screen and (max-width: 1440px) {
    padding-inline-start: var(--p-medium);
    padding-inline-end: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    padding: var(--p-small);
  }

  border-bottom: 1px solid #dddddd;
`;

const FirstItemWrapper = styled.div`
  margin-right: 20px;
  @media screen and (min-width: 950px) {
    flex: 1 0 auto;
  }
  @media screen and (max-width: 743px) {
    display: none;
  }
`;

const BLogoWrapper = styled.div`
  color: var(--main-color);
  @media screen and (max-width: 1128px) {
    display: none;
  }
`;

const MLogoWrapper = styled.div`
  color: var(--main-color);
  @media screen and (min-width: 1128px) {
    display: none;
  }
`;

const SecondItemWrapper = styled.div`
  flex: 0 1 auto;
  width: 700px;
  @media screen and (min-width: 950px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BigInput = styled.div`
  margin-left: -20px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: calc(100% - 48px);

  min-height: 56px;
  min-width: 285px;
  @media screen and (min-width: 743px) {
    display: none;
  }
`;

const SwitchWrapper = styled.div`
  border: 1px solid #dddddd;
  margin-right: -0.5rem;
`;

const SmallInputWrapper = styled.div`
  margin-left: -30px;
  @media screen and (max-width: 743px) {
    display: none;
  }
`;

const SmallInput = styled.div`
  height: 95%;
  border: 1px solid #dddddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
  span {
    background-color: #dddddd;
  }
  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
`;

const SmallInputSearch = styled.div`
  background-color: #ff385c;
`;

const ThirdItemWrapper = styled.div`
  flex: 1 0 auto;
  @media screen and (min-width: 950px) {
    flex: 1 0 140px;
  }
  @media screen and (max-width: 743px) {
    display: none;
  }
  div:last-child {
    color: #717171;
    border: 1px solid #dddddd;
    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
    label {
      margin-right: -7px;
    }
  }
  div:nth-child(2) {
    margin-left: -15px;
    &:hover {
      background-color: rgb(249 250 251);
    }
  }
  div:first-child {
    &:hover {
      background-color: rgb(249 250 251);
    }
  }
`;

const LoginUserIcon = styled.span`
  background-color: #222222;
`;
