import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Booking from "../pages/booking/Booking";
import NotFoundPage from "../pages/error/NotFoundPage";
import Admin from "../pages/admin/admin/Admin";
import AllBookings from "../pages/admin/allBookings/AllBookings";
import ServiceManagement from "../pages/admin/serviceManagement/ServiceManagement";
import SlotManagement from "../pages/admin/slotManagement/SlotManagement";
import UserManagement from "../pages/admin/userManagement/UserManagement";
import User from "../pages/user/user/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path:'/admin',
        element:<Admin></Admin>,
        children:[
          {
            path:'bookings',
            element:<AllBookings></AllBookings>
          },
          {
            path:'servicesManagement',
            element:<ServiceManagement></ServiceManagement>
          },
          {
            path:'slotsManagement',
            element:<SlotManagement></SlotManagement>
          },
          {
            path:'usersManagement',
            element:<UserManagement></UserManagement>
          },
        ]
      },
      {
        path:'/user',
        element:<User></User>,
        children:[
          {
            
          }
        ]
      }
    ],
  },
]);

export default router;
