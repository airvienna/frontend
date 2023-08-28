import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';
import Footer from './Nav/Footer';
import { styled } from 'styled-components';

const NavWrapper = styled.nav`
  border-bottom: 1px solid #dddddd;
`;

function App() {
  return (
    <>
      <NavWrapper>
        <Nav />
      </NavWrapper>

      <Outlet />

      <Footer />
    </>
  );
}

export default App;
