import { Navigate, useParams } from 'react-router-dom';
import { EditUserProfilePage } from '../../pages/applicants/EditProfileApplicant';
import { EditCompanyProfilePage } from '../../pages/companies/EditProfileCompany';

export function EditProfileSwitch() {
  const { userType } = useParams<{ userType: string }>();

  if (userType === 'user') {
    return <EditUserProfilePage />;
  } else if (userType === 'company') {
    return <EditCompanyProfilePage />;
  } else {
    return <Navigate to="/404" />;
  }
}
