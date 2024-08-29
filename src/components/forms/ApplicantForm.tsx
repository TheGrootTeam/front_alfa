import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { IApplicantInfoWithPassword } from '../../utils/interfaces/IInfoApplicant';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormSelect } from '../formElements/formSelect';
import { FormMultiSelect } from '../formElements/formMultiselect';
import { Button } from '../common/Button';
import {
  skills as rawSkills,
  rols as rawRoles,
} from '../../utils/utilsInfoCollections';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';

interface MultiSelectOption {
  _id: string;
  [key: string]: string;
}

const formattedSkills: MultiSelectOption[] = rawSkills.map((skill) => ({
  _id: skill._id,
  skill: skill.skill,
}));

const formattedRoles: MultiSelectOption[] = rawRoles.map((role) => ({
  _id: role._id,
  rol: role.rol,
}));

// TODO - mover fuera cuando veamos que todo funcione
interface ApplicantFormProps {
  formData: IApplicantInfoWithPassword;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMultiSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
}

export function ApplicantForm({
  formData,
  onTextChange,
  onCheckboxChange,
  onSelectChange,
  onMultiSelectChange,
  onFileChange,
  onSubmit,
  loading,
  error,
}: ApplicantFormProps) {
  const { t } = useTranslation();

  const jobOptions = useFormSelectOptions('job');
  const internOptions = useFormSelectOptions('internship');

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInputText
          labelText="DNI / CIF"
          id="dniCif"
          name="dniCif"
          value={formData.dniCif || ''}
          readOnly
          onChange={onTextChange}
        />

        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          readOnly
          onChange={onTextChange}
        />

        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password || ''}
          readOnly
          onChange={onTextChange}
        />

        <FormInputText
          labelText={t('fields.name')}
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={onTextChange}
        />

        <FormInputText
          labelText={t('fields.lastName')}
          id="lastName"
          name="lastName"
          value={formData.lastName || ''}
          onChange={onTextChange}
        />

        <FormInputText
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={onTextChange}
        />

        <FormInputText
          labelText={t('fields.location')}
          id="ubication"
          name="ubication"
          value={formData.ubication || ''}
          onChange={onTextChange}
        />

        <label>{t('fields.photo')}</label>
        <input type="file" name="photo" onChange={onFileChange} />

        <label>{t('fields.cv')}</label>
        <input type="file" name="cv" onChange={onFileChange} />

        <FormSelect
          labelText={t('fields.preferredWorkLocation')}
          id="typeJob"
          name="typeJob"
          value={formData.typeJob || ''}
          onChange={onSelectChange}
          options={jobOptions}
        />

        <FormSelect
          labelText={t('forms.preferredInternshipType')}
          id="internType"
          name="internType"
          value={formData.internType || ''}
          onChange={onSelectChange}
          options={internOptions}
        />

        <FormMultiSelect
          labelText={t('fields.mainSkills')}
          id="mainSkills"
          name="mainSkills"
          value={formData.mainSkills.map((skill) => skill._id)}
          onChange={onMultiSelectChange}
          optionLabel="skill"
          options={formattedSkills}
        />

        <FormMultiSelect
          labelText={t('fields.wantedRols')}
          id="wantedRols"
          name="wantedRols"
          value={formData.wantedRol.map((rol) => rol._id)}
          onChange={onMultiSelectChange}
          optionLabel="rol"
          options={formattedRoles}
        />

        <FormCheckbox
          id="geographically_mobile"
          name="geographically_mobile"
          labelText={t('fields.willingToRelocate')}
          checked={!!formData.geographically_mobile}
          onChange={onCheckboxChange}
        />

        <FormCheckbox
          id="disponibility"
          name="disponibility"
          labelText={t('fields.availableImmediately')}
          checked={!!formData.disponibility}
          onChange={onCheckboxChange}
        />

        {error && <p className={styles.error}>Error: {error}</p>}

        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </>
  );
}
