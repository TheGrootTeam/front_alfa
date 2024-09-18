import { useSelector } from 'react-redux';
import { RequireAuthProps } from '../../utils/interfaces/IAuth';
import { getIsLogged } from '../../store/selectors';
import { Navigate } from 'react-router-dom';

function RequireNotLoguedToLoguin({ children }: RequireAuthProps) {
  const isLogged = useSelector(getIsLogged);

  return !isLogged ? children : <Navigate to="/user" replace />;
}

export default RequireNotLoguedToLoguin;
