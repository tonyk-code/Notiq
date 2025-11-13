import { type User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { auth } from "../../config/FirebaseConfig";
import { authContext } from "../../context/AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const data = useMemo(() => {
    return {
      user,
      loading,
    };
  }, [user, loading]);

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}
