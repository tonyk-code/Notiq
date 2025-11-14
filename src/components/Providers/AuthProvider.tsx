import { type User, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { auth } from "../../config/FirebaseConfig";
import { authContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { errorMap } from "../../utils/Types";
import useAlert from "../../hooks/useAlert";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { displayMessage } = useAlert();
  // setting current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Loging out
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const message = errorMap[error.code] || "unexpected error occured";
        displayMessage(message, "error");
      } else {
        displayMessage("An unknown system error occurred.", "error");
      }
    },
  });

  const data = useMemo(() => {
    return {
      user,
      loading,
      signout: signOutMutation,
    };
  }, [user, loading, signOutMutation]);

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}
