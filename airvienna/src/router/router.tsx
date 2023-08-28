import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../screens/Home';
import { action } from '../Components/Modals/EmailSignupModal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    action: action,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

export default router;
