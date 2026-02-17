import DashboardUser from "../DashboardUser.jsx";

export default function AdminDashboardContent() {
  return (
    <section className="mt-5 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-[#F6339A]/60 dark:bg-white/5">
      <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
      <DashboardUser />
    </section>
  );
}
