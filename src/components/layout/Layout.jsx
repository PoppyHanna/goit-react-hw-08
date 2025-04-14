import { Outlet } from "react-router-dom";
import AppBar from "../appBar/AppBar";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
