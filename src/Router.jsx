import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import InHouse from "./InHouse";
import NotFound from "./404";
import Visit from "./Visit";
import Portfolio from "./Portfolio";
import Profile from "./profile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/inHouse",
    element: <InHouse />,
  },
  {
    path: "/visit",
    element: <Visit />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default Router;
