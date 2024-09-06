import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../store/selectors';
import { RequireAuthProps } from '../../utils/interfaces/IAuth';

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
