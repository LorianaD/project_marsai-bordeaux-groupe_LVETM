import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import AdminLayoutSidebar from "../admin/AdminLayoutSidebar";
import AdminHero from "../admin/AdminHero";
import AdminSidebarModal from "../admin/AdminSidebarModal";
import getAdminActiveKey from "../../utils/adminNavigation";

function AdminLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = getAdminActiveKey(pathname);

  // La fonction de refresh fournie par la page courante
  const [refreshFn, setRefreshFn] = useState(null);

  function handleRefresh() {
    if (typeof refreshFn === "function") refreshFn();
  }

  return (
    <div className="w-full">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={active}
      />

      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active={active} />

          <div className="min-w-0 flex-1">
            <AdminHero />

            {/* Boutons mobile */}
            <div className="m-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                Menu
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={!refreshFn}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                Rafraîchir
              </button>
            </div>

            {/* Ici on passe setRefreshFn à la page */}
            <div className="m-[30px]">
              <Outlet context={{ setRefreshFn }} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
