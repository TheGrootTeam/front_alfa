import React from 'react';
import styles from './Applicants.module.css';
import ApplicantDetail from './ApplicantDetail';

interface Applicant {
  id: number;
  name: string;
  email: string;
}

// Datos de ejemplo
const applicantsData: Applicant[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
  { id: 2, name: 'María López', email: 'maria.lopez@example.com' }
];

const Applicants: React.FC = () => {
  return (
    <div className={styles.applicants}>
      <h2>Applicants</h2>
      <ul>
        {applicantsData.map(applicant => (
          <li key={applicant.id} className={styles.applicant}>
            <ApplicantDetail
              id={applicant.id}
              name={applicant.name}
              email={applicant.email}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applicants;
