import { Navigate, Route, Routes } from "react-router";
import AdminNewsletterEditor from "./AdminNewsletterEditor";
import AdminNewsletters from "./AdminNewsletters";
import AdminNewsletter from "./AdminNewsletter";
import AdminNewsletterNew from "./AdminNewslettersNew";
import DistributionJury from "./DistributionJury";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "../../components/login/LoginForm";
import AdminRegister from "./AdminRegister";
import AdminVideos from "./AdminVideos";
import AdminEvents from "./AdminEvents";
import Overview from "../Overview";
import AdminSettings from "./AdminSettings";
import Partner from "../../components/Form/CMS/Home/Partner";
import UpdatePartner from "../../components/Form/CMS/Home/UpdatePartner";

import SectionHeroForm from "../../components/Form/CMS/Home/SectionHeroForm";
import SectionConceptForm from "../../components/Form/CMS/Home/SectionConceptForm";
import SectionAwardForm from "../../components/Form/CMS/Home/SectionAwardForm";
import SectionGoalForm from "../../components/Form/CMS/Home/SectionGoalForm";

export function AdminRouter() {
    return(
        <Routes>
            {/* Admin */}
            <Route index element={<AdminDashboard />} />

            {/* Pages admin */}
            <Route path="/" element={<Overview />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="distribution-jury" element={<DistributionJury />} />
            <Route path="settings" element={<AdminSettings />} />

            {/* auth/admin */}
            <Route path="register" element={<AdminRegister />} />
            <Route path="login" element={<AdminLogin />} />

            {/* Newsletter */}
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="newsletters" element={<AdminNewsletters />} />
            <Route path="newsletters/new" element={<AdminNewsletterNew />} />
            <Route path="newsletters/:id" element={<AdminNewsletterEditor />} />
            


            {/* ROUTES TEMPORAIRES / CMS */}
            <Route path="partnerform" element={<Partner />} />
            <Route path="partner/:id" element={<UpdatePartner />} />
            <Route path="cms/sectionhero" element={<SectionHeroForm />} />
            <Route path="cms/sectionconcept" element={<SectionConceptForm />} />
            <Route path="cms/sectionaward" element={<SectionAwardForm />} />
            <Route path="cms/sectiongoal" element={<SectionGoalForm />} />

            {/* fallback admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />

        </Routes>
    )
}