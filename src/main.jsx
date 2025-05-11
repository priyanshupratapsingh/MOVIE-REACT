import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import Data from './components/Data.jsx'
import TVdata from './components/TVdata.jsx'

const routerr = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/movies/:movieid",
    element: <Data/>
  },
  {
    path: "/tv/:tvid",
    element: <TVdata/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerr}/>
    {/* <App /> */}
  </StrictMode>,
)
