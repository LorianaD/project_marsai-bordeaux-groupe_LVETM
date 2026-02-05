import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import JuryList from "./pages/JuryList.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import Legal from "./pages/Legal.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import AdminVideos from "./pages/Admin/AdminVideos.jsx";
import AdminEvents from "./pages/Admin/AdminEvents.jsx";
import Partner from "./components/Form/CMS/Home/Partner.jsx";
import UpdatePartner from "./components/Form/CMS/Home/UpdatePartner.jsx";

export default function App() {
  return (
    <Routes>
      {/*  PUBLIC – avec Header + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<VideoDetails />} />
        <Route path="/participation" element={<ParticipationUploadPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/jury" element={<JuryList />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      
    {/* ADMIN  */}
<Route element={<MainLayout />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin/events" element={<AdminEvents />} />
    <Route path="/admin/videos" element={<AdminVideos />} />
  </Route>
</Route>


      {/* Route temporaire */}
      <Route path="/partnerform" element={< Partner />} />
      <Route path="/partner/:id" element={< UpdatePartner />}/>

      {/*  Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
