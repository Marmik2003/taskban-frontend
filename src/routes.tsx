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
    element: <Navigate to="todo" />,
  },
  {
    path: "todo",
    element: <Home />,
  },
  {
    path: "boards",
    element: <Boards />,
  },
  {
    path: "boards/:id",
    element: <Board />,
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
