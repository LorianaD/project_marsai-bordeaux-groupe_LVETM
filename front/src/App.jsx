import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";


import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";

function App() {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

       
        <Route path="/participation" element={<ParticipationUploadPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
