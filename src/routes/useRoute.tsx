import { Routes, Route } from "react-router";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { SetupPage } from "../pages/SetupPage/SetupPage";
import { PasswordResetPage } from "../pages/PasswordResetPage/PasswordResetPage";
import { Reauthenticate } from "../pages/Reauthenticate/Reauthenticate";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import type { User } from "firebase/auth";

export function useRoute({ user }: { user: User | null }) {
  return (
    <>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/Home page"
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reauthenticate"
          element={
            <ProtectedRoute user={user}>
              <Reauthenticate />
            </ProtectedRoute>
          }
        />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/setting up" element={<SetupPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
