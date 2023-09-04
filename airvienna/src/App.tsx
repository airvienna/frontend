import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';
import { styled } from 'styled-components';
import BottomNav from './Nav/Footer';

const Main = styled.div`
  margin-top: calc(var(--nav-h) * 2 + 1rem); // Nav높이 뺸 값
`;

function App() {
  return (
    <>
      <Nav />

      <Main className="pb-20">
        <Outlet />
      </Main>

      <BottomNav />
    </>
  );
}

export default App;
