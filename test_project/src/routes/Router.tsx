import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../components/loadable/Loadable";

const Layout = Loadable(lazy(() => import("../components/layout/Layout")));
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Sell = Loadable(lazy(() => import("../views/sell/Sell")));
const Login = Loadable(lazy(() => import("../views/login/Login")));
const Notfound = Loadable(
  lazy(() => import("../components/errorboundary/404"))
);

const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/sell", exact: true, element: <Sell /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/auth/404", exact: true, element: <Notfound /> },
      { path: "*", element: <Navigate to="/auth/404" /> }
    ]
  }
];

export default Router;
