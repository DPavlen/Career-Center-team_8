export interface IFilter {
  specialization_id: string | null,
  course: string[],
  hards: string[],
  experience: string[],
  level: string[],
  location: string[],
  employmentType: string[],
  workSchedule: string[],
}

export type IFiltersOptions = Record<keyof IFilter, string[]>;
