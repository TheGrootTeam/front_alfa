import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../store/selectors';

interface RequireAuthProps {
  children: ReactNode;

  //children: ReactElement - es más específico y se asegura de que RequireAuth siempre reciba un elemento React válido.
}

function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);
  //console.log:TODO: quitar
  console.log('is logged?', isLogged);

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
