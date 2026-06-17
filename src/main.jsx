import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './components/Home.jsx';
import AllProducts from './components/AllProducts.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import MyProducts from './components/MyProducts.jsx';
import MyBids from './components/MyBids.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },

      {
        path: "allproducts",
        element: <AllProducts></AllProducts>
      },

      {
        path: "register",
        element: <Register></Register>
      },
      {
        path:"myproducts",
        element: <MyProducts></MyProducts>
      },
      {
        path:"mybids",
        element: <MyBids></MyBids>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <RouterProvider router={router} />
    </AuthProvider>
     
  </StrictMode>,
)
