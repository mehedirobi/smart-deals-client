import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./components/Home.jsx";
import AllProducts from "./components/AllProducts.jsx";
import Register from "./components/Register.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import MyProducts from "./components/MyProducts.jsx";
import MyBids from "./components/MyBids.jsx";
import ProducDetails from "./components/ProducDetails.jsx";
import AboutUs from "./components/AboutUs.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import PrivateRoute from "./components/router/PrivateRoute.jsx";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "myproducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "createproduct",
        element: (
          <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "allproducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "mybids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "productdetails/:id",
        loader: async ({ params }) => {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/products/${params.id}`,
          );

          if (!res.ok) {
            throw new Response("Product not found", { status: 404 });
          }

          return res.json();
        },
        element: <PrivateRoute><ProducDetails /></PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
