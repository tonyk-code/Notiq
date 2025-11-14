import { createContext } from "react";
import { type User } from "firebase/auth";
import type { UseMutationResult } from "@tanstack/react-query";
type authData = {
  user: User | null;
  loading: boolean;
  signout: UseMutationResult<void, Error, void, unknown>;
};

export const authContext = createContext<authData>({} as authData);
