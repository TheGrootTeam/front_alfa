import { Navigate, useParams } from 'react-router-dom';
import { UserProfilePage } from '../../pages/applicants/ProfileApplicant';
import { CompanyProfilePage } from '../../pages/companies/ProfileCompany';

export function ProfileSwitch() {
  const { userType /*, id*/ } = useParams<{
    userType?: string /*; id?: string*/;
  }>();

  if (userType === 'user') {
    return <UserProfilePage /*userId={id ?? ''}*/ />;
  } else if (userType === 'company') {
    return <CompanyProfilePage /*userId={id ?? ''}*/ />;
  } else {
    return <Navigate to="/404" />;
  }
}
