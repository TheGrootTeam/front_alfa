import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { CompanyForm } from '../../components/forms/CompanyForm';
import { getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { sectors } from '../../utils/utilsInfoCollections'; // TODO cogerlas de la API con endpoint

// MARTA - TODO - TEMP mientras David acaba de trabajar con las interfaces de company
interface ICompanyInfoWithPassword {
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: Sector;
  ubication: string;
  description: string;
  logo: string;
  password: string;
}
interface Sector {
  _id: string;
  sector: string;
}

export function EditCompanyProfilePage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  const [formData, setFormData] = useState<ICompanyInfoWithPassword>({
    dniCif: '',
    name: '',
    email: '',
    phone: '',
    sector: {
      _id: '',
      sector: '',
    },
    ubication: '',
    description: '',
    logo: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSectorSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'sector') {
      // Find the selected sector object by ID
      const selectedSector = sectors.find((sector) => sector._id === value) || {
        _id: '',
        sector: '',
      };

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedSector, // Update the sector object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
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
    <Layout title={t('titles.companyprofile_edit')} page="editcompanyprofile">
      <CompanyForm
        formData={formData}
        onInputChange={handleInputChange}
        onTextareaChange={handleTextChange}
        onSelectChange={handleSectorSelectChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}
