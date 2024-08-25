import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../store/selectors';

interface RequireAuthProps {
  children: ReactNode;

  // Children: Reactelement - It is more specific and ensures that Requireouth always receives a valid Restt element.
}

function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
