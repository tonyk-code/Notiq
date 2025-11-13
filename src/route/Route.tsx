import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { SignupPage } from "../components/SignupPage/SignupPage";
import { HomePage } from "../components/HomePage/HomePage/HomePage";
import { Reauthenticate } from "../components/Reauthenticate/Reauthenticate";
import { PasswordResetPage } from "../components/PasswordResetPage/PasswordResetPage";
import { PageNotFound } from "../components/PageNotFound/PageNotFound";
import { SetupPage } from "../components/SetupPage/SetupPage";
import { DashboardPage } from "../components/DashboardPage/DashboardPage";
import ProtectedRoute from "./Protected";

export default function Route() {
  const authenticatedRoutes = [
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [{ index: true, element: <HomePage /> }],
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
