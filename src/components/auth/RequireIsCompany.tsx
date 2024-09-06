import { useSelector } from 'react-redux';
import { RequireAuthProps } from '../../utils/interfaces/IAuth';
import { getIsCompany } from '../../store/selectors';
import { Navigate } from 'react-router-dom';

export default function RequireIsCompany({ children }: RequireAuthProps) {
  const isCompany = useSelector(getIsCompany);

  return isCompany ? children : <Navigate to="/user" replace />;
}
