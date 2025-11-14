import { Outlet } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";

export const HomeLayout = () => {
  return (
    <main>
      <AppHeader/>
      <Outlet />
    </main>
  );
};
