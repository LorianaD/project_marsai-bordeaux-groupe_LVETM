import AdminConferenceProgramContent from "../../components/admin/ConferenceProgram/AdminConferenceProgramContent.jsx";

export default function AdminConferenceProgram() {

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <main className="flex-1">
            <div className="mt-5">
              <AdminConferenceProgramContent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
