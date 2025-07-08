import React from 'react';
import {createBrowserRouter} from "react-router";
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children:[{
      path: "/",
      Component: HomePage,
    },
    {
        path: '/login',
        Component: LoginPage
      },
      {
        path: '/register',
        Component: RegisterPage
      },
  ]

  },
]);

export default router;