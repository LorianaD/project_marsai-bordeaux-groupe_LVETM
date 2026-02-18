import AdminEventsContent from "../../components/admin/Events/AdminEventsContent.jsx";

export default function AdminEvents() {

  return (
    <div className="">

      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">

          <main className="min-w-0 flex-1">
    
            {/* Contenu Events : tout le state/logic est dans AdminEventsContent */}
            <AdminEventsContent />
  
          </main>
        </div>
      </div>
    </div>
  );
}
