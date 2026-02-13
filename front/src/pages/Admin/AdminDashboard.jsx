import { useState } from "react";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import AdminTopBar from "../../components/admin/AdminTopBar.jsx";
import DashboardUser from "../../components/admin/DashboardUser.jsx";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="overview"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="overview" />

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm dark:bg-white/5"
              >
                ☰ Menu
              </button>
            </div>

            <AdminTopBar
              pageTitle="Overview"
              subtitle="Vue d'ensemble du dashboard."
            />

            <section className="mt-5 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-[#F6339A]/60 dark:bg-white/5">
              <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
              <DashboardUser />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;