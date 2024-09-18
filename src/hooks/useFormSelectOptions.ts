// hooks/useFormSelectOptions.ts
export const useFormSelectOptions = (type: 'job' | 'internship') => {

  const optionsMap: Record<string, string[]> = {
    job: ['Presencial', 'Híbrido', 'Remoto'],
    internship: ['Remunerado', 'No remunerado', 'ONG/Voluntariado'],
  };

  return optionsMap[type].map((key) => (key));
};
