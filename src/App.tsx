import Spinner from "./components/Spinner/Spinner";
import { useAuth } from "./hooks/useAuth";
import Route from "./route/Route";

function App() {
  const data  = useAuth();
  if (data.loading) {
    return (
      <Spinner color="dot-spinner-black"/>
    );
  }
  return <Route/>
}

export default App;
