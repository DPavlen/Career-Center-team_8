/* eslint-disable camelcase */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const vacancyFormScheme = yup.object().shape({
  job_title: yup
    .string()
    .required('Обязательное поле'),
  company: yup
    .string()
    .required('Обязательное поле'),
  required_requirements: yup
    .string()
    .required('Обязательное поле'),
  responsibilities: yup
    .string()
    .required('Обязательное поле'),
  conditions: yup
    .string()
    .required('Обязательное поле'),
  salary_from: yup
    .string(),
  salary_to: yup
    .string(),
  optional_requirements: yup
    .string(),
  selection_stages: yup
    .string(),
  id: yup
    .string(),
});
