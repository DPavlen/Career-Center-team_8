import { TSavedVacancies, TVacancyDto } from '../../store/savedVacancies/savedVacancies';

export default function createVacancyMapperFromBackend(vacancy: TVacancyDto): TSavedVacancies {
  return {
    id: vacancy.id,
    name: vacancy.name,
    company: vacancy.company,
    salaryLow: vacancy.salary_low,
    salaryHigh: vacancy.salary_high,
    requirements: vacancy.requirements,
    optional: vacancy.optional,
    conditions: vacancy.conditions,
    stages: vacancy.stages,
    responsibilities: vacancy.responsibilities,
    filters: {
      // eslint-disable-next-line camelcase
      specialization_id: vacancy.specialization_id,
      course: vacancy.course,
      hards: vacancy.hards,
      experience: vacancy.experience,
      level: vacancy.level,
      location: vacancy.location,
      employmentType: vacancy.employment_type,
      workSchedule: vacancy.work_schedule,
    },

  };
}
