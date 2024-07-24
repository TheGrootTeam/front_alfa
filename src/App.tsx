import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LostPassword } from './pages/auth/LostPassword';

import { HomePage } from './pages/home/HomePage';

import { DashBoardInternPage } from './pages/dashboard/DashboardInternPage';
import { UserProfilePage } from './pages/users/ProfilePage';
import { EditUserProfilePage } from './pages/users/EditProfilePage';

import { DashBoardCompanyPage } from './pages/dashboard/DashboardCompanyPage';
import { CompanyProfilePage } from './pages/companies/ProfilePage';
import { EditCompanyProfilePage } from './pages/companies/EditProfilePage';

import { OfferPage } from './pages/offers/OfferPage';
import { EditOffer } from './pages/offers/EditOffer';
import { AddNewOffer } from './pages/offers/AddNewOffer';

import { AboutPage } from './pages/about/AboutPage';
import { NotFoundPage } from './pages/notfound/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lost-password" element={<LostPassword />} />

      {/* START Rutas protegidas */}
      <Route path="/user">
        <Route index element={<DashBoardInternPage />} />
        <Route path="edit" element={<EditUserProfilePage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>

      <Route path="/company">
        <Route index element={<DashBoardCompanyPage />} />
        <Route path="edit" element={<EditCompanyProfilePage />} />
        <Route path="profile" element={<CompanyProfilePage />} />
      </Route>

      <Route path="/offers">
        <Route path=":id" element={<OfferPage />} />
        <Route path=":id/edit" element={<EditOffer />} />
        <Route path="new" element={<AddNewOffer />} />
      </Route>
      {/* END Rutas protegidas */}

      <Route path="/about" element={<AboutPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
