/* eslint-disable camelcase */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const vacancyFormScheme = yup.object().shape({
  name: yup
    .string()
    .required('Обязательное поле'),
  company: yup
    .string()
    .required('Обязательное поле'),
  requirements: yup
    .string()
    .required('Обязательное поле'),
  responsibilities: yup
    .string()
    .required('Обязательное поле'),
  conditions: yup
    .string()
    .required('Обязательное поле'),
  salaryLow: yup
    .number(),
  salaryHigh: yup
    .number(),
  optional: yup
    .string(),
  stages: yup
    .string(),
  id: yup
    .string(),
});
