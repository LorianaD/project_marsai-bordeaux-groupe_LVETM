import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";

import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import Legal from "./pages/Legal.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import PartnersPage from "./pages/Partner.jsx";
import Overview from "./pages/Overview.jsx";
import Jury from "./pages/Jury.jsx";
import NewsletterConfirm from "./pages/NewsletterConfirm";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";

import AdminVideos from "./pages/Admin/AdminVideos.jsx";
import AdminEvents from "./pages/Admin/AdminEvents.jsx";
import DistributionJury from "./pages/Admin/DistributionJury.jsx";

import Partner from "./components/Form/CMS/Home/Partner.jsx";
import UpdatePartner from "./components/Form/CMS/Home/UpdatePartner.jsx";
import SectionHeroForm from "./components/Form/CMS/Home/SectionHeroForm.jsx";

// ✅ Newsletter admin
import AdminNewsletter from "./pages/Admin/AdminNewsletter.jsx";
import AdminNewsletters from "./pages/Admin/AdminNewsletters.jsx";
import AdminNewslettersNew from "./pages/Admin/AdminNewslettersNew.jsx"; // ✅ bon fichier
import AdminNewsletterEditor from "./pages/Admin/AdminNewsletterEditor.jsx";

export default function App() {
  return (
    <Routes>
      {/* ROUTES PUBLIQUES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<VideoDetails />} />
        <Route path="/participation" element={<ParticipationUploadPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/partner" element={<PartnersPage />} />
        <Route path="/jury" element={<Jury />} />
        <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
        <Route
          path="/newsletter/unsubscribe"
          element={<NewsletterUnsubscribe />}
        />

        {/* ROUTES ADMIN (dans AdminLayout) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Overview />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/videos" element={<AdminVideos />} />
          <Route
            path="/admin/distribution-jury"
            element={<DistributionJury />}
          />

          {/*  Newsletter admin */}
          <Route path="/admin/newsletter" element={<AdminNewsletter />} />
          <Route path="/admin/newsletters" element={<AdminNewsletters />} />
          <Route
            path="/admin/newsletters/new"
            element={<AdminNewslettersNew />}
          />
          <Route
            path="/admin/newsletters/:id"
            element={<AdminNewsletterEditor />}
          />
        </Route>
      </Route>

      {/* ROUTES TEMPORAIRES / CMS */}
      <Route path="/partnerform" element={<Partner />} />
      <Route path="/partner/:id" element={<UpdatePartner />} />
      <Route path="/cms/sectionhero" element={<SectionHeroForm />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
