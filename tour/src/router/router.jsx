import React from 'react';
import {createBrowserRouter} from "react-router";
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AvailableTrips from '../Pages/AvailableTrips';
import MyTrips from '../Pages/MyTrips';
import AddTrips from '../Pages/AddTrips';
import TripDetails from '../Pages/TripDetails';
import UpdateTrip from '../Pages/UpdateTrip';
import PrivateRoute from '../Context/PrivateRoute';
import MyBookings from '../Pages/MyBookings';

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
      {
        path: '/availabletrips',
         loader: ()=> fetch('http://localhost:3000/trips'),
        Component: AvailableTrips
      },
      {
        path: '/addtrips',
        element: <PrivateRoute><AddTrips></AddTrips></PrivateRoute>
      },
      {
        path: '/tripdetails/:id',
         loader: ({ params }) => fetch(`http://localhost:3000/trips/${params.id}`),
        element: <PrivateRoute><TripDetails></TripDetails></PrivateRoute>
      },
      {
        path: '/mytrips',
        loader: ()=> fetch('http://localhost:3000/trips'),
        element: <PrivateRoute><MyTrips></MyTrips></PrivateRoute>
      }, 
      {
        path: '/mybookings',
        element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
      },
      {
        path: '/update/:id',
      loader: ({params})=> fetch(`http://localhost:3000/trips${params.id}`),
        element: <PrivateRoute><UpdateTrip></UpdateTrip></PrivateRoute>
      },
  ]

  },
])

export default router;