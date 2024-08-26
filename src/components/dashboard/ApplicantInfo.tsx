import { useEffect, useState } from 'react';
import { getInfoApplicant } from '../../utils/services/infoApplicantService';

export default function ApplicantInfo() {
  const [applicant, setApplicant] = useState({});

  useEffect(() => {
    const a = async () => {
      const c = await getInfoApplicant();
      setApplicant(c);
    };
    a();
    debugger;
  }, []);

  return (
    <>
      <p>{applicant.lastName}</p>
      <p>{applicant.phone}</p>
    </>
  );
}
