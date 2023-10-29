/* eslint-disable camelcase */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const vacancyFormScheme = yup.object().shape({
  job_title: yup
    .string()
    .min(5, 'Минимальное количество символов 5')
    .required('Обязательное поле'),
  company: yup
    .string()
    .min(5, 'Минимальное количество символов 5')
    .required('Обязательное поле'),
  required_requirements: yup
    .string()
    .min(5, 'Минимальное количество символов 5')
    .required('Обязательное поле'),
  responsibilities: yup
    .string()
    .min(5, 'Минимальное количество символов 5')
    .required('Обязательное поле'),
  conditions: yup
    .string()
    .min(5, 'Минимальное количество символов 5')
    .required('Обязательное поле'),
  salary_from: yup
    .string(),
  salary_to: yup
    .string(),
  optional_requirements: yup
    .string(),
  selection_stages: yup
    .string(),
  filters:
   yup.object().shape({
     specialization: yup
       .string()
       .required('Обязательный фильтр'),
     course: yup
       .array(yup.string()),
     hards: yup
       .array(yup.string()),
     experience: yup
       .array(yup.string()),
     level: yup
       .array(yup.string()),
     location: yup
       .array(yup.string()),
     employmentType: yup
       .array(yup.string()),
     workSchedule: yup
       .array(yup.string()),
   }),
});
