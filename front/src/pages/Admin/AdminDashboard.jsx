import AdminDashboardContent from "../../components/admin/Dashboard/AdminDashboardContent.jsx";

export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">

          <main className="min-w-0 flex-1">

            {/* Contenu du dashboard */}
            <AdminDashboardContent />

          </main>
        </div>
      </div>
    </div>
  );
}