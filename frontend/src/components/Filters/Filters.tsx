import './Filters.scss';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import settings from '../../assets/icons/settings.svg';
import professions from '../../utils/testProfessionArea.json';
import skillsData from '../../utils/testSkills.json';
import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';
import CheckboxGroupFilter from '../CheckboxGroupFilter/CheckboxGroupFilter';
import deleteIcon from '../../assets/icons/delete.svg';
import { initialState } from '../../store/vacanciesFilter/vacanciesFilter';
import { IFilter } from '../../store/filter';

interface IFiltersProps {
  filterValue: IFilter;
  onResetAllFilters: () => void;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
}

function Filters({ filterValue, onResetAllFilters, onSetFilter }: IFiltersProps) {
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
      <RadioGroupFilter
        filter="profession"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        data={professions}
        withBorder={false}
      />
      <CheckboxGroupFilter
        filter="course"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Курс Практикума"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="skills"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Навыки"
        placeholder="Введите навык"
        withSearch
        data={skillsData}
      />
      <CheckboxGroupFilter
        filter="experience"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Опыт работы"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="level"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Уровень"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="location"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Геопозиция"
        placeholder="Введите геопозицию"
        withSearch
        data={skillsData}
      />
      <CheckboxGroupFilter
        filter="busyType"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="Тип занятости"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="workingType"
        filterValue={filterValue}
        onSetFilter={onSetFilter}
        title="График работы"
        data={professions}
      />
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
