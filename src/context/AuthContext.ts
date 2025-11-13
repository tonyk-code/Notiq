import { createContext } from "react";
import { type User } from "firebase/auth";
type authData = {
  user: User | null;
  loading: boolean;
};

export const authContext = createContext<authData>({} as authData);
