import { styled } from 'styled-components';
import Homeitem from '../Components/home/Homeitem';

const HomeWrapper = styled.div`
  height: calc(100vh - 10rem);
  padding-inline-start: var(--p-big);
  padding-inline-end: var(--p-big);
  @media screen and (max-width: 1440px) {
    height: calc(100vh - 11rem);
    padding-inline-start: var(--p-medium);
    padding-inline-end: var(--p-medium);
  }
  @media screen and (max-width: 743px) {
    height: calc(100vh - 9rem);
    padding: var(--p-small);
  }

  display: grid;
  place-items: start center;

  grid-template-columns: repeat(6, minmax(180px, 1fr));
  @media screen and (max-width: 1877px) {
    grid-template-columns: repeat(5, minmax(180px, 1fr));
  }
  @media screen and (max-width: 1620px) {
    grid-template-columns: repeat(4, minmax(180px, 1fr));
  }
  @media screen and (max-width: 1130px) {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }
  @media screen and (max-width: 940px) {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
`;

const Home = () => {
  return (
    <HomeWrapper className="w-full gap-5">
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
      <Homeitem />
    </HomeWrapper>
  );
};

export default Home;
