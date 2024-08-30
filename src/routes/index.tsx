import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Booking from "../pages/booking/Booking";
import NotFoundPage from "../pages/error/NotFoundPage";

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
    ],
  },
]);

export default router;
