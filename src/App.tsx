import { Routes, Route, Navigate } from "react-router";
import { DashboardPage } from "./components/DashboardPage/DashboardPage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { SignupPage } from "./components/SignupPage/SignupPage";
import { HomePage } from "./components/HomePage/HomePage/HomePage";
import "./App.css";
import { SetupPage } from "./components/LoadingPage/SetupPage";
import { PasswordResetPage } from "./components/PasswordResetPage/PasswordResetPage";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState, type JSX } from "react";
import { auth } from "./config/FirebaseConfig";
import { Reauthenticate } from "./components/Reauthenticate/Reauthenticate";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";

const ProtectedRoute = ({
  user,
  children,
}: {
  user: User | null;
  children: JSX.Element;
}) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="dot-spinner dot-spinner-black">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    );
  }

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
              <HomePage />
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

export default App;
