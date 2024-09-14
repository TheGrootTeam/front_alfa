import { Route, Outlet, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
// import { useSelector } from 'react-redux';
// import { getIsLogged } from './store/selectors';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LostPassword } from './pages/auth/LostPassword';

import { HomePage } from './pages/home/HomePage';

import { DashBoardInternPage } from './pages/dashboard/DashboardInternPage';
import { EditUserProfilePage } from './pages/applicants/EditProfileApplicant';

import { DashBoardCompanyPage } from './pages/dashboard/DashboardCompanyPage';
import { EditCompanyProfilePage } from './pages/companies/EditProfileCompany';

import { OfferPage } from './pages/offers/OfferPage';
import { EditOffer } from './pages/offers/EditOffer';
import { AddNewOffer } from './pages/offers/AddNewOffer';

import { AboutPage } from './pages/about/AboutPage';
import { NotFoundPage } from './pages/notfound/NotFoundPage';
import RequireIsCompany from './components/auth/RequireIsCompany';
import RequireIsApplicant from './components/auth/RequireIsApplicant';

// import { EditProfileSwitch } from './components/routing/EditProfileSwitch';
import { ProfileSwitch } from './components/routing/ProfileSwitch';
import RequireNotLoguedToLoguin from './components/auth/RequireNotLoguedToLogin';
import { ChangePasswordPage } from './pages/password/ChangePasswordPage';

function App() {
  // const isLogged = useSelector(getIsLogged);

  return (
    <Routes>
      {/* PRIVATE (APPLICANT) - dashboard */}
      <Route
        path="/user"
        element={
          <RequireAuth>
            <RequireIsApplicant>
              <Outlet />
            </RequireIsApplicant>
          </RequireAuth>
        }
      >
        <Route index element={<DashBoardInternPage />} />
        <Route path="edit" element={<EditUserProfilePage />} />
      </Route>

      {/* PRIVATE (COMPANY) - Dashboard */}
      <Route
        path="/company"
        element={
          <RequireAuth>
            <RequireIsCompany>
              <Outlet />
            </RequireIsCompany>
          </RequireAuth>
        }
      >
        <Route index element={<DashBoardCompanyPage />} />
        <Route path="edit" element={<EditCompanyProfilePage />} />
      </Route>

      {/* PRIVATE (ANY) - Cambio de password (accesible para usuario logado de cualquier tipo) */}
      <Route
        path="/change_password"
        element={
          <RequireAuth>
            <ChangePasswordPage />
          </RequireAuth>
        }
      />

      {/* PRIVATE (COMPANY) - Offers - Publicación y edición */}
      <Route
        path="/offers"
        element={
          <RequireAuth>
            <RequireIsCompany>
              <Outlet />
            </RequireIsCompany>
          </RequireAuth>
        }
      >
        <Route path="new" element={<AddNewOffer />} />
        <Route path="edit" element={<EditOffer />} />
      </Route>

      {/* PUBLIC - Auth - Login, Registro, Lost Password */}
      <Route
        path="/login"
        element={
          <RequireNotLoguedToLoguin>
            <Outlet />
          </RequireNotLoguedToLoguin>
        }
      >
        <Route index element={<LoginPage />} />
      </Route>

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lost-password" element={<LostPassword />} />

      {/* PUBLIC - Vista de oferta individual */}
      <Route path="/offers">
        <Route path=":id" element={<OfferPage />} />
      </Route>

      {/* PUBLIC - Ruta para visualización de perfiles basada en parámetros */}
      <Route path="/view/:userType/:id/" element={<ProfileSwitch />} />

      {/* PUBLIC home, about y manejo de errores */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* REVISAR - PRIVATE (ANY) - Perfiles - Ruta para edición basada en parámetros */}
      {/* {isLogged && (
        <>
          <Route
            path="/edit/:userType"
            element={
              <RequireAuth>
                <EditProfileSwitch />
              </RequireAuth>
            }
          />
        </>
      )} */}
    </Routes>
  );
}

export default App;
