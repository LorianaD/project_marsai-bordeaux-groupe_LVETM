import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";

import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Jury from "./pages/Jury.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import Legal from "./pages/Legal.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import PartnersPage from "./pages/Partner.jsx";
import NewsletterConfirm from "./pages/NewsletterConfirm";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import LearnMore from "./pages/LearnMore.jsx";

import { AdminRouter } from "./pages/Admin/AdminRouter.jsx";

export default function App() {
  return (
    <Routes>
      {/* ROUTES PUBLIQUES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<VideoDetails />} />
        <Route path="/participation" element={<ParticipationUploadPage />} />
        <Route path="/learnMore" element={<LearnMore />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/jury" element={<Jury />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/partner" element={<PartnersPage />} />
        <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
        <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
      </Route>

      {/* ADMIN  */}
      <Route element={<MainLayout />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/*" element={<AdminRouter />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}