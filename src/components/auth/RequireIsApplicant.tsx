import { useSelector } from 'react-redux';
import { RequireAuthProps } from '../../utils/interfaces/IAuth';
import { getIsCompany, getLoadingAuth } from '../../store/selectors';
import { Navigate } from 'react-router-dom';
import { Loader } from '../common/Loader';

export default function RequireIsApplicant({ children }: RequireAuthProps) {
  const isCompany = useSelector(getIsCompany);
  const loadingAuth = useSelector(getLoadingAuth);

  if (loadingAuth) {
    return <Loader />;
  }

  return !isCompany ? children : <Navigate to="/company" replace />;
}
