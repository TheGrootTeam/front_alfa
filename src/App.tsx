import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import { useSelector } from 'react-redux';
import { getIsLogged } from './store/selectors';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LostPassword } from './pages/auth/LostPassword';

import { HomePage } from './pages/home/HomePage';

// DASHBOARDS - mirar como se ha montado el switch para perfiles, si creeis que puede ir bien para esto tb
// import { DashBoardInternPage } from './pages/dashboard/DashboardInternPage';
// import { DashBoardCompanyPage } from './pages/dashboard/DashboardCompanyPage';

import { OfferPage } from './pages/offers/OfferPage';
import { EditOffer } from './pages/offers/EditOffer';
import { AddNewOffer } from './pages/offers/AddNewOffer';
import { OffersList } from './pages/offers/OffersList';

import { AboutPage } from './pages/about/AboutPage';
import { NotFoundPage } from './pages/notfound/NotFoundPage';

import { EditProfileSwitch } from './components/routing/EditProfileSwitch';
import { ProfileSwitch } from './components/routing/ProfileSwitch';

function App() {
  const isLogged = useSelector(getIsLogged);

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<HomePage />} />

      {/* Auth - Login, Registro, lost password */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lost-password" element={<LostPassword />} />

      {/* Offers - Lista e individual */}
      <Route path="/offers">
        <Route index element={<OffersList />} />
        <Route path=":id" element={<OfferPage />} />
      </Route>

      {/* Perfiles - Ruta para visualización de perfiles basada en parámetros */}
      <Route path="/view/:userType/:id/" element={<ProfileSwitch />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />

      {/* RUTAS PRIVADAS */}
      {isLogged && (
        <>
          {/* Offers - Crear y editar */}
          <Route path="/offers">
            {/* <Route path=":id/edit" element={<EditOffer />} /> */}
            {/* La oferta a editar va en el body */}
            <Route path="edit" element={<EditOffer />} />
            <Route path="new" element={<AddNewOffer />} />
          </Route>

          {/* Perfiles - Ruta para edición basada en parámetros */}
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
    </Routes>
  );
}

export default App;
