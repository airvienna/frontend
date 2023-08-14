import { Outlet } from 'react-router-dom';
import './App.css';
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
