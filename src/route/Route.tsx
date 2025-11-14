import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Protected";
import { HomePage } from "../pages/HomePage/HomePage";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { PasswordResetPage } from "../pages/PasswordResetPage/PasswordResetPage";
import { Reauthenticate } from "../pages/ReauthenticatePage/Reauthenticate";
import { SetupPage } from "../pages/SetupPage/SetupPage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { HomeLayout } from "../components/Layouts/HomeLayout";

export default function Route() {
  const authenticatedRoutes = [
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          element: <HomeLayout />,
          children: [{ index: true, element: <HomePage /> }],
        },
      ],
    },
    {
      path: "/reauthenticate",
      element: <ProtectedRoute />,
      children: [{ index: true, element: <Reauthenticate /> }],
    },
  ];
  const publicRoutes = [
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <DashboardPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/sign-up", element: <SignupPage /> },
    { path: "/password-reset", element: <PasswordResetPage /> },
    { path: "/setting-up", element: <SetupPage /> },
  ];

  const routes = createBrowserRouter([...authenticatedRoutes, ...publicRoutes]);
  return <RouterProvider router={routes} />;
}
