export interface IFilter {
  specialization_id: string | null,
  course: string[],
  hards: string[],
  experience: string[],
  level_id: string[],
  location: string[],
  employment_type: string[],
  work_schedule: string[],
}

export type IFiltersOptions = Record<keyof IFilter, string[]>;
