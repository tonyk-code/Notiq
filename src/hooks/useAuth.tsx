import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export const useAuth = () => {
  const data = useContext(authContext);
  if (!data) throw new Error("'useAuth' needs to be inside a provider!");
  return data;
};
