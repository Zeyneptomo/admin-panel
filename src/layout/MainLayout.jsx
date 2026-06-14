import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1 main-content">

        <Header />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default MainLayout;