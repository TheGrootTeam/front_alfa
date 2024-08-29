import { useState } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { IApplicantInfoWithPassword } from '../../utils/interfaces/IInfoApplicant';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormSelect } from '../formElements/formSelectTemp';
import { FormMultiSelect } from '../formElements/formMultiselect';
import { Button } from '../common/Button';
import {
  skills as rawSkills,
  rols as rawRoles,
} from '../../utils/utilsInfoCollections';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';

const formattedSkills = rawSkills.map((skill) => ({
  _id: skill._id,
  skill: skill.skill,
}));

const formattedRoles = rawRoles.map((role) => ({
  _id: role._id,
  rol: role.rol,
}));

interface ApplicantFormProps {
  loading: boolean;
  error: string | null;
}

export function ApplicantForm({ loading, error }: ApplicantFormProps) {
  const { t } = useTranslation();

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
      mainSkills: formattedSkills,
      rols: formattedRoles,
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
    // TODO: Submit logic here
  };

  const jobOptions = useFormSelectOptions('job');
  const internOptions = useFormSelectOptions('internship');

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText
          labelText="DNI / CIF"
          id="dniCif"
          name="dniCif"
          value={formData.dniCif || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText={t('fields.name')}
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText={t('fields.lastName')}
          id="lastName"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleTextChange}
        />

        <FormInputText
          labelText={t('fields.location')}
          id="ubication"
          name="ubication"
          value={formData.ubication || ''}
          onChange={handleTextChange}
        />

        <label>{t('fields.photo')}</label>
        <input type="file" name="photo" onChange={handleFileChange} />

        <label>{t('fields.cv')}</label>
        <input type="file" name="cv" onChange={handleFileChange} />

        <FormSelect
          labelText={t('fields.preferredWorkLocation')}
          id="typeJob"
          name="typeJob"
          value={formData.typeJob || ''}
          onChange={handleSelectChange}
          options={jobOptions}
        />

        <FormSelect
          labelText={t('forms.preferredInternshipType')}
          id="internType"
          name="internType"
          value={formData.internType || ''}
          onChange={handleSelectChange}
          options={internOptions}
        />

        <FormMultiSelect
          labelText={t('fields.mainSkills')}
          id="mainSkills"
          name="mainSkills"
          value={formData.mainSkills.map((skill) => skill._id)}
          onChange={handleMultiSelectChange}
          optionLabel="skill"
          options={formattedSkills}
        />

        <FormMultiSelect
          labelText={t('fields.wantedRols')}
          id="wantedRols"
          name="wantedRols"
          value={formData.wantedRol.map((rol) => rol._id)}
          onChange={handleMultiSelectChange}
          optionLabel="rol"
          options={formattedRoles}
        />

        <FormCheckbox
          id="geographically_mobile"
          name="geographically_mobile"
          labelText={t('fields.willingToRelocate')}
          checked={!!formData.geographically_mobile}
          onChange={handleCheckboxChange}
        />

        <FormCheckbox
          id="disponibility"
          name="disponibility"
          labelText={t('fields.availableImmediately')}
          checked={!!formData.disponibility}
          onChange={handleCheckboxChange}
        />

        {error && <p className={styles.error}>Error: {error}</p>}

        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </>
  );
}
