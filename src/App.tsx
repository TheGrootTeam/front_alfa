import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { EditProfilePage } from "./pages/auth/EditProfilePage";

import { HomePage } from "./pages/home/HomePage";
import { DashBoardInternPage } from "./pages/dashboard/DashboardInternPage";
import { DashBoardCompanyPage } from "./pages/dashboard/DashboardCompanyPage";

import { AboutPage } from "./pages/about/AboutPage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard-intern" element={<DashBoardInternPage />} />
      <Route path="/dashboard-company" element={<DashBoardCompanyPage />} />\
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/edit" element={<EditProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
