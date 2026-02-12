import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import DashboardUser from "../../components/admin/DashboardUser.jsx";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-[1320px] gap-6 px-4 py-5">
        <AdminLayoutSidebar active="overview" />

        <main className="flex-1">
          <div className="flex items-center justify-between gap-3 rounded-3xl border border-black/10 bg-black/5 px-5 py-3 dark:border-[#F6339A]/60 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-black/10 px-4 py-2 text-[20px] font-semibold tracking-[0.22em] uppercase dark:bg-white/10">
                MARS <span className="text-[#F6339A]">AI</span>
              </span>
              <div className="hidden md:block">
                <p className="text-[16px] font-semibold">
                  Administration — <span className="text-black/70 dark:text-white/70">Overview</span>
                </p>
                <p className="text-[15px] text-black/60 dark:text-white/60">
                  Vue d’ensemble du dashboard.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-5 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-[#F6339A]/60 dark:bg-white/5">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <DashboardUser />
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;