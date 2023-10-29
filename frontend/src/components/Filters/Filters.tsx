import { useEffect, useState } from 'react';

import './Filters.scss';

import Button from '@mui/material/Button';

import { IFilter } from '../../store/filter';
import { AllFilters } from '../../store/candidates/candidates';
import { initialState } from '../../store/vacanciesFilter/vacanciesFilter';

import settings from '../../assets/icons/settings.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';
import CheckboxGroupFilter from '../CheckboxGroupFilter/CheckboxGroupFilter';

interface IFiltersProps {
  filters: AllFilters;
  filterValue: IFilter;
  onResetAllFilters: () => void;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
}

function Filters({
  filters,
  filterValue,
  onResetAllFilters,
  onSetFilter,
}: IFiltersProps) {
  const [selectedAmount, setSelectedAmount] = useState(0);

  // мы заранее не знаем к какому слайсу будет подключен нащ компонент,
  // поэтому принимаем текущее значение в сторе через пропсы
  useEffect(() => {
    setSelectedAmount(Object.entries(filterValue)
      .filter(([key, value]) => {
        const storedValue = initialState[key as keyof IFilter];

        if (Array.isArray(value) && Array.isArray(storedValue)) {
          return value.length !== storedValue.length || value.some((v) => !storedValue.includes(v));
        }

        return value !== storedValue;
      }).length);
  }, [filterValue]);

  return (
    <form className="filters">
      <div className="filters__header">
        <div className="filters__headline">
          <img className="filters__img" alt="settings" src={settings} />
          <h2 className="filters__title">
            Фильтр
            {' '}
            <span className="filters__count">{selectedAmount || null}</span>
          </h2>
        </div>
        <Button
          startIcon={<img alt="delete-icon" src={deleteIcon} />}
          sx={{
            textTransform: 'none',
            textColor: 'var(--Blue-main)',
            fontSize: '13px',
            padding: 0,
            fontWeight: '400',
          }}
          onClick={() => onResetAllFilters()}
        >
          Сбросить
        </Button>
      </div>
      {filters.experience.length > 0 && (
        <RadioGroupFilter
          filter="profession"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          data={filters.specialization}
          withBorder={false}
        />
      )}
      {filters.course.length > 0 && (
        <CheckboxGroupFilter
          filter="course"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Курс Практикума"
          data={filters.course}
        />
      )}
      {filters.hards.length > 0 && (
        <CheckboxGroupFilter
          filter="skills"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Навыки"
          placeholder="Введите навык"
          withSearch
          data={filters.hards}
        />
      )}
      {filters.experience.length > 0 && (
        <CheckboxGroupFilter
          filter="experience"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Опыт работы"
          data={filters.experience}
        />
      )}
      {filters.level.length > 0 && (
        <CheckboxGroupFilter
          filter="level"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Уровень"
          data={filters.level}
        />
      )}
      {filters.location.length > 0 && (
        <CheckboxGroupFilter
          filter="location"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Геопозиция"
          placeholder="Введите геопозицию"
          withSearch
          data={filters.location}
        />
      )}
      {filters.employmentType.length > 0 && (
        <CheckboxGroupFilter
          filter="busyType"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Тип занятости"
          data={filters.employmentType}
        />
      )}
      {filters.workSchedule.length > 0 && (
        <CheckboxGroupFilter
          filter="workingType"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="График работы"
          data={filters.workSchedule}
        />
      )}
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
