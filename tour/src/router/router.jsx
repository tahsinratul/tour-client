import React from 'react';
import {createBrowserRouter} from "react-router";
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AvailableTrips from '../Pages/AvailableTrips';
import MyTrips from '../Pages/MyTrips';
import MyBookings from '../Pages/MyBookings';
import AddTrips from '../Pages/AddTrips';
import TripDetails from '../Pages/TripDetails';
import UpdateTrip from '../Pages/UpdateTrip';

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
        Component: AddTrips 
      },
      {
        path: '/tripdetails/:id',
         loader: ({ params }) => fetch(`http://localhost:3000/trips/${params.id}`),
        Component: TripDetails 
      },
      {
        path: '/mytrips',
        loader: ()=> fetch('http://localhost:3000/trips'),
        Component: MyTrips
      },
      {
        path: '/mybookings',
        Component: MyBookings
      },
      {
        path: '/update/:id',
      loader: ({params})=> fetch(`http://localhost:3000/trips${params.id}`),
        Component: UpdateTrip
      },
  ]

  },
])

export default router;