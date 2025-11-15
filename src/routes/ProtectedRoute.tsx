import type { User } from "firebase/auth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  user,
  children,
}: {
  user: User | null;
  children: JSX.Element;
}) {
  return user ? children : <Navigate to="/login" replace />;
}
