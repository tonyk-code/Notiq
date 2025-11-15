import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config/FirebaseConfig";
import Spinner from "./components/Spinner/Spinner";
import { useRoute } from "./routes/useRoute";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const routes = useRoute({ user });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <Spinner color="dot-spinner-black" />;
  }

  return <>{routes}</>;
}

export default App;
