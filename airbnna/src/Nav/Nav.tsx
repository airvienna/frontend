import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MLogo from './MLogo';
import LLogo from './LLogo';
import Word from './Word';
import { FaBars, FaUserCircle } from 'react-icons/fa';

const Wrapper = styled.div`
  display: block;
  contain:strict
  overflow-clip-margin: var(--explore-nav_box-shadow-spread);
`;

const Header = styled.header`
  height: 80px;
  width: 100%;
  z-index: 100;
  position: relative;
`;

const NavWrapper = styled.div`
  max-width: var(--page-shell-max-content-width, 1760px);
  padding-inline-start: var(--explore_padding-inline);
  padding-inline-end: var(--explore_padding-inline);
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
  margin-inline: auto;
  box-sizing: border-box;
`;

const NavFirst = styled.div`
  flex: 1 0 140px;
  box-sizing: border-box;
`;

const LLogoWrapper = styled.div`
  @media screen and (max-width: 1128px) {
    display: none;
  }
`;

const MLogoWrapper = styled.div`
  @media screen and (min-width: 1128px) {
    display: none;
  }
`;

const NavSecond = styled.div`
  flex: 0 1 auto;
  min-width: 348px;
  background-color: tomato;
  padding: 0 24px;
  box-sizing: border-box;
`;

const NavThird = styled.div`
  flex: 1 0 140px;
  box-sizing: border-box;
  position: relative;
  height: 80px;
`;

const NavThirdFirstDiv = styled.div`
  margin-right: 8px;
  a {
    background: transparent;
    border: 0;
    cursor: pointer;
    margin: 0;
    padding: 12px;
    div {
      align-items: center;
      display: flex;
      height: 100%;
      position: relative;
      z-index: 1;
      white-space: nowrap;
      font-size: var(--c-zdwk-p);
      font-weight: var(--jx-zk-pv);
    }
  }
  button {
    background: transparent;
    border: 0;
    cursor: pointer;
    margin: 0;
    padding: 12px;
    div {
      height: 100%;
      position: relative;
      z-index: 1;
      div {
        height: 18px;
      }
    }
  }
`;

const NavThirdSecondDiv = styled.div`
  box-sizing: border-box;
`;

const UserBtn = styled.button`
  padding: 5px 5px 5px 12px;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  background-color: var(--f-mkcy-f);
  border: 1px solid var(--j-qkgmf);
  border-radius: 21px;
  transition: box-shadow 0.5s var(--itr-yy-z);
  overflow: visible;
  &:hover {
    box-shadow: var(--e-swdx-p);
  }
  div:last-child {
    margin-left: 12px;
    color: var(--fo-jk-r-s);
    flex: 0 0 30px;
    height: 30px;
    overflow: hidden;
    position: relative;
    width: 30px;
    z-index: 1;
    box-sizing: border-box;
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <Header>
        <NavWrapper className="flex justify-between items-center">
          <NavFirst>
            <Link to="/">
              <LLogoWrapper>
                <LLogo />
              </LLogoWrapper>
              <MLogoWrapper>
                <MLogo />
              </MLogoWrapper>
            </Link>
          </NavFirst>

          <NavSecond>2</NavSecond>

          <NavThird className="flex justify-end items-center">
            <NavThirdFirstDiv className="flex justify-end">
              <a href="/">
                <div>당신의 공간을 에어비엔나하세요</div>
              </a>
              <button onClick={() => console.log('1')}>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Word />
                  </div>
                </div>
              </button>
            </NavThirdFirstDiv>
            <NavThirdSecondDiv>
              <div className="inline relative">
                <UserBtn className="flex items-center">
                  <div>
                    <FaBars className="w-4 h-4" />
                  </div>
                  <div>
                    <FaUserCircle className="w-7 h-7" />
                  </div>
                </UserBtn>
              </div>
            </NavThirdSecondDiv>
          </NavThird>
        </NavWrapper>
      </Header>
    </Wrapper>
  );
};

export default Nav;
