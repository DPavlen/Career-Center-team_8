import { useEffect, useState } from 'react';

import './Filters.scss';

import Button from '@mui/material/Button';

import { IFilter, IFiltersOptions } from '../../store/filter';
import { initialState } from '../../store/vacanciesFilter/vacanciesFilter';

import settings from '../../assets/icons/settings.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';
import CheckboxGroupFilter from '../CheckboxGroupFilter/CheckboxGroupFilter';

interface IFiltersProps {
  filtersOptions: IFiltersOptions;
  filterValue: IFilter;
  onResetAllFilters: () => void;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
}

function Filters({
  filtersOptions,
  filterValue,
  onResetAllFilters,
  onSetFilter,
}: IFiltersProps) {
  const [selectedAmount, setSelectedAmount] = useState(0);

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
      {filtersOptions?.specialization && (
        <RadioGroupFilter
          filter="specialization"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          data={filtersOptions.specialization}
          withBorder={false}
        />
      )}
      {filtersOptions?.course.length > 0 && (
        <CheckboxGroupFilter
          filter="course"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Курс Практикума"
          data={filtersOptions.course}
        />
      )}
      {filtersOptions?.hards.length > 0 && (
        <CheckboxGroupFilter
          filter="hards"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Навыки"
          placeholder="Введите навык"
          withSearch
          data={filtersOptions.hards}
        />
      )}
      {filtersOptions?.experience.length > 0 && (
        <CheckboxGroupFilter
          filter="experience"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Опыт работы"
          data={filtersOptions.experience}
        />
      )}
      {filtersOptions?.level.length > 0 && (
        <CheckboxGroupFilter
          filter="level"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Уровень"
          data={filtersOptions.level}
        />
      )}
      {filtersOptions?.location.length > 0 && (
        <CheckboxGroupFilter
          filter="location"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Геопозиция"
          placeholder="Введите геопозицию"
          withSearch
          data={filtersOptions.location}
        />
      )}
      {filtersOptions?.employmentType.length > 0 && (
        <CheckboxGroupFilter
          filter="employmentType"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="Тип занятости"
          data={filtersOptions.employmentType}
        />
      )}
      {filtersOptions?.workSchedule.length > 0 && (
        <CheckboxGroupFilter
          filter="workSchedule"
          filterValue={filterValue}
          onSetFilter={onSetFilter}
          title="График работы"
          data={filtersOptions.workSchedule}
        />
      )}
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
