import { Navigate, Route, Routes } from "react-router";

import AdminRegister from "./AdminRegister";
import AdminLogin from "../../components/login/LoginForm";

import Overview from "./Overview";

import AdminNewsletterEditor from "./AdminNewsletterEditor";
import AdminNewsletters from "./AdminNewsletters";
import AdminNewsletter from "./AdminNewsletter";
import AdminNewsletterNew from "./AdminNewslettersNew";
import DistributionJury from "./DistributionJury";
import AdminDashboard from "./AdminDashboard";
import AdminVideos from "./AdminVideos";
import AdminEvents from "./AdminEvents";
import AdminSettings from "./AdminSettings";

export function AdminRouter() {
    return(
        <Routes>

            {/* Admin */}
            <Route index element={<AdminDashboard />} />

            {/* Pages admin */}
            <Route path="/overview" element={<Overview />} />
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

            {/* fallback admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />

        </Routes>
    )
}