import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Outlet />
    </div>
  );
}

export default AdminLayout;
