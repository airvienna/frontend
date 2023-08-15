import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../screens/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);

export default router;
