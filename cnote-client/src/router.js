import { createBrowserRouter } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import TimeSheet from "./pages/TimeSheet";
import Notes from "./pages/Notes";

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
    children: [
      {
        index: true,
        Component: Watch,
      },
      {
        path: "watch",
        Component: Watch,
      },
      {
        path: "timesheet",
        Component: TimeSheet,
      },
      {
        path: "notes",
        Component: Notes,
      }
    ],
  }
]);