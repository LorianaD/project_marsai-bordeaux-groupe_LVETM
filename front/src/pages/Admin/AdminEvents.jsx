import { useState } from "react";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminEventsContent from "../../components/admin/Events/AdminEventsContent.jsx";

export default function AdminEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="events"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="events" />

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                ☰ Menu
              </button>
            </div>

            {/* Hero */}
            <div className="mt-5">
              <AdminHero />
            </div>

            {/* Contenu Events : tout le state/logic est dans AdminEventsContent */}
            <AdminEventsContent />
          </main>
        </div>
      </div>
    </div>
  );
}
