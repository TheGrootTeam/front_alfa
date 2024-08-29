import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { FormInputText } from '../formElements/formInputText';
import { FormTextarea } from '../formElements/formTextareaProps';
import { Button } from '../common/Button';
import { sectors } from '../../utils/utilsInfoCollections';

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

// TODO - mover fuera cuando veamos que todo funcione
interface CompanyFormProps {
  formData: ICompanyInfoWithPassword;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
}

export function CompanyForm({
  formData,
  onInputChange,
  onTextareaChange,
  onSelectChange,
  onFileChange,
  onSubmit,
  loading,
  error,
}: CompanyFormProps) {
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInputText
          labelText="CIF"
          id="dniCif"
          name="dniCif"
          value={formData.dniCif || ''}
          readOnly
          onChange={onInputChange}
        />
        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          readOnly
          onChange={onInputChange}
        />
        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password || ''}
          readOnly
          onChange={onInputChange}
        />
        <FormInputText
          labelText={t('fields.name')}
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={onInputChange}
        />
        <FormInputText
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={onInputChange}
        />
        MARTA - sin usar componente porque este select funciona distinto de los
        demas, y solo se usa aqui
        <label htmlFor="sector">Preferred Sector</label>
        <select
          id="sector"
          name="sector"
          value={formData.sector._id} // Use the sector _id for the value
          onChange={onSelectChange}
        >
          <option value="">Select a sector</option>
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
          onChange={onInputChange}
        />
        <FormTextarea
          labelText={t('fields.description')}
          placeholder="Description"
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={onTextareaChange}
        />
        <label>{t('fields.logo')}</label>
        <input type="file" name="logo" onChange={onFileChange} />
        {error && <p className={styles.error}>Error: {error}</p>}
        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </>
  );
}
