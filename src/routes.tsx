import { Navigate, RouteObject } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import RequireAuth from "./components/RequireAuth";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const previledgedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="home" />,
  },
  {
    path: "home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "boards",
    element: (
      <RequireAuth>
        <Boards />
      </RequireAuth>
    ),
    children: [
      {
        path: ":boardId",
        element: (
          <RequireAuth>
            <Board />
          </RequireAuth>
        ),
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/*",
    element: (
      <RequireAuth>
        <BaseLayout />
      </RequireAuth>
    ),
  },
];

export { routes, previledgedRoutes };
