import { useState } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { FormInputText } from '../formElements/formInputText';
import { FormTextarea } from '../formElements/formTextareaProps';
import { Button } from '../common/Button';
import { sectors } from '../../utils/utilsInfoCollections'; // Fetch sectors from the API when available

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

interface CompanyFormProps {
  loading: boolean;
  error: string | null;
}

export function CompanyForm({ loading, error }: CompanyFormProps) {
  const { t } = useTranslation();

  // State and form data moved here
  const [formData, setFormData] = useState<ICompanyInfoWithPassword>({
    dniCif: '',
    name: '',
    email: '',
    phone: '',
    sector: { _id: '', sector: '' },
    ubication: '',
    description: '',
    logo: '',
    password: '',
  });

  // Handlers moved here
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
      const selectedSector = sectors.find((sector) => sector._id === value) || {
        _id: '',
        sector: '',
      };

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedSector,
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
    // Handle form submission here
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText
          labelText="CIF"
          id="dniCif"
          name="dniCif"
          value={formData.dniCif || ''}
          readOnly
          onChange={handleInputChange}
        />
        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          readOnly
          onChange={handleInputChange}
        />
        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password || ''}
          readOnly
          onChange={handleInputChange}
        />
        <FormInputText
          labelText={t('fields.name')}
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
        />
        <FormInputText
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleInputChange}
        />

        <label htmlFor="sector">{t('fields.sector')}</label>
        <select
          id="sector"
          name="sector"
          value={formData.sector._id}
          onChange={handleSectorSelectChange}
        >
          <option value="">{t('forms.select_sector')}</option>
          {sectors.map((sector) => (
            <option key={sector._id} value={sector._id}>
              {sector.sector}
            </option>
          ))}
        </select>

        <FormInputText
          labelText={t('fields.location')}
          id="ubication"
          name="ubication"
          value={formData.ubication || ''}
          onChange={handleInputChange}
        />

        <FormTextarea
          labelText={t('fields.description')}
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleTextChange}
        />

        <label>{t('fields.logo')}</label>
        <input type="file" name="logo" onChange={handleFileChange} />

        {error && <p className={styles.error}>Error: {error}</p>}

        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </>
  );
}
