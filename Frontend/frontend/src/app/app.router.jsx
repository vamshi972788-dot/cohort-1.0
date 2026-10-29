
import { createBrowserRouter, Navigate } from 'react-router'
import Login from './feactures/auth/pages/Login.jsx'
import Register from './feactures/auth/pages/Register.jsx'
import Dashboard from './feactures/chat/pages/Dashboard.jsx'
import Protected from './feactures/auth/componets/Protected.jsx'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Dashboard /></Protected>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  {
    path: "/dashboard",
    element :<Navigate to="/" replace />
  }

])
