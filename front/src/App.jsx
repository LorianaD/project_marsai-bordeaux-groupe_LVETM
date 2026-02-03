import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";
import Events from "./pages/Events.jsx";
import Faq from "./pages/Faq.jsx";
import JuryList from "./pages/JuryList.jsx";
import Legal from "./pages/Legal.jsx";
import Privacy from "./pages/Privacy.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms.jsx";

import AdminVideos from "./pages/Admin/AdminVideos.jsx";
import Partner from "./components/Form/CMS/Home/Partner.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Pages Public */}
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

        {/* Pages Admin */}
        <Route path="/admin/videos" element={<AdminVideos />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Route en attendant la connexion admin */}
      <Route path="/partnerForm" element={< Partner /> } />
    </Routes>
  );
}
