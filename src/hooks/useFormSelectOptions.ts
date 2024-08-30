// hooks/useFormSelectOptions.ts
import { useTranslation } from 'react-i18next';

export const useFormSelectOptions = (type: 'job' | 'internship') => {
  const { t } = useTranslation();

  const optionsMap: Record<string, string[]> = {
    job: [
      'formSelect.jobType.on_site',
      'formSelect.jobType.hybrid',
      'formSelect.jobType.remote',
    ],
    internship: [
      'formSelect.internshipType.paid',
      'formSelect.internshipType.unpaid',
      'formSelect.internshipType.ngo',
    ],
  };

  return optionsMap[type].map((key) => t(key));
};
