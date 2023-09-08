import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';
import { styled } from 'styled-components';
import BottomNav from './Nav/Footer';

const NavWrapper = styled.div``;

const Main = styled.div`
  margin-top: calc(var(--nav-h) * 2 + 1rem); // Nav높이 뺸 값
  background-color: white;
`;

function App() {
  return (
    <>
      <NavWrapper className="w-full relative z-10">
        <Nav />
      </NavWrapper>

      <Main className="pb-20 relative z-0">
        <Outlet />
      </Main>

      <BottomNav />
    </>
  );
}

export default App;
