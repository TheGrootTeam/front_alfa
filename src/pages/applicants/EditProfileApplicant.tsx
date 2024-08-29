import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ApplicantForm } from '../../components/forms/ApplicantForm';
import { IApplicantInfoWithPassword } from '../../utils/interfaces/IInfoApplicant';
import { getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { skills, rols } from '../../utils/utilsInfoCollections'; // TODO cogerlas de la API con endpoint

export function EditUserProfilePage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  const [formData, setFormData] = useState<IApplicantInfoWithPassword>({
    dniCif: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    photo: '',
    cv: '',
    ubication: '',
    typeJob: '',
    internType: '',
    wantedRol: [],
    mainSkills: [],
    geographically_mobile: false,
    disponibility: false,
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    const fieldMappings: { [key: string]: any[] } = {
      mainSkills: skills,
      rols: rols,
    };

    if (fieldMappings[name]) {
      const selectedObjects = fieldMappings[name].filter((item) =>
        selectedValues.includes(item._id)
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedObjects,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <ApplicantForm
        formData={formData}
        onTextChange={handleTextChange}
        onCheckboxChange={handleCheckboxChange}
        onSelectChange={handleSelectChange}
        onMultiSelectChange={handleMultiSelectChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}
