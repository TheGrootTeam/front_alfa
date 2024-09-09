// hooks/useFormSelectOptions.ts
import { useTranslation } from 'react-i18next';

export const useFormSelectOptions = (type: 'job' | 'internship') => {
  const { t } = useTranslation();

  const optionsMap: Record<string, string[]> = {
    job: ['Presencial', 'Híbrido', 'Remoto'],
    internship: ['Remunerado', 'No remunerado', 'ONG/Voluntariado'],
  };

  return optionsMap[type].map((key) => t(key));
};
