import './Filters.scss';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import settings from '../../assets/icons/settings.svg';
import professions from '../../utils/testProfessionArea.json';
import skillsData from '../../utils/testSkills.json';
import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';
import CheckboxGroupFilter from '../CheckboxGroupFilter/CheckboxGroupFilter';
import deleteIcon from '../../assets/icons/delete.svg';
import { initialState, resetAllFilters } from '../../store/vacanciesFilter/vacanciesFilter';
import { RootState } from '../../store/store';

function Filters() {
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const selectedAmount: number = useSelector((state: RootState) => Object.entries(state.vacanciesFilter)
    .filter(([key, value]) => {
      const storedValue = initialState[key as keyof RootState['vacanciesFilter']];

      if (Array.isArray(value) && Array.isArray(storedValue)) {
        return value.length !== storedValue.length || value.some((v) => !storedValue.includes(v));
      }

      return value !== storedValue;
    }).length);

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
          onClick={() => dispatch(resetAllFilters())}
        >
          Сбросить
        </Button>
      </div>
      <RadioGroupFilter
        panel="panel1"
        filter="profession"
        data={professions}
        withBorder={false}
      />
      <CheckboxGroupFilter
        filter="course"
        panel="panel2"
        title="Курс Практикума"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="skills"
        panel="panel3"
        title="Навыки"
        placeholder="Введите навык"
        withSearch
        data={skillsData}
      />
      <CheckboxGroupFilter
        filter="experience"
        panel="panel4"
        title="Опыт работы"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="level"
        panel="panel5"
        title="Уровень"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="location"
        panel="panel6"
        title="Геопозиция"
        placeholder="Введите геопозицию"
        withSearch
        data={skillsData}
      />
      <CheckboxGroupFilter
        filter="busyType"
        panel="panel7"
        title="Тип занятости"
        data={professions}
      />
      <CheckboxGroupFilter
        filter="workingType"
        panel="panel8"
        title="График работы"
        data={professions}
      />
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
