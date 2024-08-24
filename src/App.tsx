import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import { useSelector } from 'react-redux';
import { getIsLogged } from './store/selectors';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LostPassword } from './pages/auth/LostPassword';

import { HomePage } from './pages/home/HomePage';

import { DashBoardInternPage } from './pages/dashboard/DashboardInternPage';
import { UserProfilePage } from './pages/applicants/ProfileApplicant';
import { EditUserProfilePage } from './pages/applicants/EditProfileApplicant';

import { DashBoardCompanyPage } from './pages/dashboard/DashboardCompanyPage';
import { CompanyProfilePage } from './pages/companies/ProfileCompany';
import { EditCompanyProfilePage } from './pages/companies/EditProfileCompany';

import { OfferPage } from './pages/offers/OfferPage';
import { EditOffer } from './pages/offers/EditOffer';
import { AddNewOffer } from './pages/offers/AddNewOffer';
import { OffersList } from './pages/offers/OffersList';

import { AboutPage } from './pages/about/AboutPage';
import { NotFoundPage } from './pages/notfound/NotFoundPage';

import { EditProfileSwitch } from './components/routingProfile/EditProfileSwitch';

function App() {
  const isLogged = useSelector(getIsLogged);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {!isLogged && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lost-password" element={<LostPassword />} />
        </>
      )}

      {isLogged && (
        <>
          {/* Rutas protegidas */}
          <Route
            path="/user"
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route index element={<DashBoardInternPage />} />
            <Route path="edit" element={<EditUserProfilePage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>

          <Route
            path="/company"
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route index element={<DashBoardCompanyPage />} />
            <Route path="edit" element={<EditCompanyProfilePage />} />
            <Route path="profile" element={<CompanyProfilePage />} />
          </Route>

          {/* Ruta para edición basada en parámetros */}
          <Route
            path="/edit/:userType"
            element={
              <RequireAuth>
                <EditProfileSwitch />
              </RequireAuth>
            }
          />
        </>
      )}

      {/* Rutas públicas siempre accesibles */}
      <Route path="/offers">
        <Route index element={<OffersList />} />
        <Route path=":id" element={<OfferPage />} />
        <Route path=":id/edit" element={<EditOffer />} />
        <Route path="new" element={<AddNewOffer />} />
      </Route>

      <Route path="/about" element={<AboutPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
