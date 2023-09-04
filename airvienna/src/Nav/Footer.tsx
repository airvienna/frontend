import { styled } from 'styled-components';
import Word from './svg/Word';
import { AiOutlineUp } from 'react-icons/ai';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineUserCircle } from 'react-icons/hi';

const borderTopStyle = { borderTop: '1px solid #dddddd' };

const FooterWrapper = styled.div`
  padding-inline-start: var(--p-big);
  padding-inline-end: var(--p-big);
  @media screen and (max-width: 1440px) {
    padding-inline-start: var(--p-medium);
    padding-inline-end: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    padding: var(--p-small);
  }
  @media screen and (max-width: 1043px) {
    height: 6rem;
  }
`;

const BigWrapper = styled.div`
  @media screen and (max-width: 743px) {
    display: none;
  }
`;

const SmallWrapper = styled.div`
  @media screen and (min-width: 743px) {
    display: none;
  }
`;

const Li = styled.li`
  gap: 0.625rem;
  span:last-child {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const FooterText = styled.span`
  font-size: 10px;
`;

const BottomNav = () => {
  return (
    <FooterWrapper style={borderTopStyle} className="h-20 relative w-full bottom-0">
      <BigWrapper className="h-20">
        <div className="h-1/2 w-full flex justify-between items-center whitespace-nowrap">
          <div className="flex items-center gap-3 text-sm font-normal text-slate-700">
            <span>2023 Airvienna, Kor.</span>
            <ul className="flex gap-3">
              <Li className="flex">
                <span>·</span>
                <span>이용약관</span>
              </Li>
              <Li className="flex">
                <span>·</span>
                <span>사이트맵</span>
              </Li>
              <Li className="flex">
                <span>·</span>
                <span>개발자 정보</span>
              </Li>
            </ul>
          </div>

          <div className="flex items-center gap-5 text-sm font-semibold text-gray-800">
            <span className="flex items-center gap-2 cursor-pointer">
              <Word />
              <span className="hover:underline">한국어 (KR)</span>
            </span>
            <span className="flex items-center cursor-pointer hover:underline">
              지원 및 참고 자료 <AiOutlineUp />
            </span>
          </div>
        </div>

        <div className="h-1/2 w-full flex items-center">
          <FooterText style={borderTopStyle} className="text-gray-400">
            웹사이트 제공자: Airvienna Ireland UC, Hanbat University Students | 이사: Gi
            beom kim, Seong jun no | 연락처: kkb4363@naver.com, 웹사이트, 010-1111-1111 |
            호스팅 서비스 제공업체: 아직 미정 | 에어비엔나는 프로젝트용 작품으로
            에어비엔나 플랫폼을 통하여, 게스트와 호스트 사이에 이루어지는 통신 판매의
            당사자가 아닙니다. 에어비엔나 플랫폼을 통하여 예약된 숙소, 체험, 호스트
            서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.
          </FooterText>
        </div>
      </BigWrapper>

      <SmallWrapper className="h-1/2 w-full flex justify-center items-center gap-12">
        <div className="flex flex-col items-center mt-1 text-gray-400 font-semibold cursor-pointer">
          <div className="text-3xl ">
            <HiOutlineSearch />
          </div>
          <FooterText>둘러보기</FooterText>
        </div>
        <div className="flex flex-col items-center mt-1 mx-5 text-gray-400 font-semibold cursor-pointer">
          <div className="text-3xl ">
            <HiOutlineHeart />
          </div>
          <FooterText>위시리스트</FooterText>
        </div>
        <div className="flex flex-col items-center mt-1 mx-2 text-gray-400 font-semibold cursor-pointer">
          <div className="text-3xl ">
            <HiOutlineUserCircle />
          </div>
          <FooterText>로그인</FooterText>
        </div>
      </SmallWrapper>
    </FooterWrapper>
  );
};

export default BottomNav;
