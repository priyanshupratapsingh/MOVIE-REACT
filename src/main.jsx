import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import Data from './components/Data.jsx'
import TVdata from './components/TVdata.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import MyList from './components/MyList.jsx'
import { AuthProvider } from './AuthContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/mylist",
    element: <MyList />
  },
  {
    path: "/movies/:movieid",
    element: <Data />
  },
  {
    path: "/tv/:tvid",
    element: <TVdata />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)