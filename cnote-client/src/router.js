import { createBrowserRouter } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/home",
    Component: Home,
  }
]);