import { useState } from "react";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminConferenceProgramContent from "../../components/admin/ConferenceProgram/AdminConferenceProgramContent.jsx";

export default function AdminConferenceProgram() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="conference-program"
      />
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="conference-program" />
          <main className="min-w-0 flex-1">
            <div className="mb-4 flex lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm"
              >
                ☰ Menu
              </button>
            </div>
            <div className="mt-5">
              <AdminHero name="Ocean" />
            </div>
            <div className="mt-5">
              <AdminConferenceProgramContent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
