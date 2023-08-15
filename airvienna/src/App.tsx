import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
