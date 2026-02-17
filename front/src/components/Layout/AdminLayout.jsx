import { Outlet } from "react-router-dom";
import AdminLayoutSidebar from "../admin/AdminLayoutSidebar";
import AdminHero from "../admin/AdminHero";

function AdminLayout() {
  return (
    <div className="flex gap-[20px] m-[50px]">
      <AdminLayoutSidebar/>
      <div>
        <AdminHero/>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;