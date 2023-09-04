import { styled } from 'styled-components';

const HomeWrapper = styled.div`
  height: calc(100vh - 10rem);
  @media screen and (max-width: 1043px) {
    height: calc(100vh - 11rem);
  }
  @media screen and (max-width: 743px) {
    height: calc(100vh - 9rem);
  }
`;

const Home = () => {
  return <HomeWrapper className="w-full">This is Home</HomeWrapper>;
};

export default Home;
