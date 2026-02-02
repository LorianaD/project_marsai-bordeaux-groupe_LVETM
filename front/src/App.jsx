import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AdminRegister from "./pages/Admin/AdminRegister.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
