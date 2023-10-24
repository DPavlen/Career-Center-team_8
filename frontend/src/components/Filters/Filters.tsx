import './Filters.scss';
import { useState } from 'react';
import settings from '../../assets/icons/settings.svg';
import professions from '../../utils/testProfessionArea.json';
import skillsData from '../../utils/testSkills.json';
import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';
import CheckboxGroupFilter from '../CheckboxGroupFilter/CheckboxGroupFilter';

function Filters() {
  const [profession, setProfession] = useState<string | null>(null);
  const [course, setCourse] = useState<number[]>([]);
  const [skills, setSkills] = useState<number[]>([]);
  const [location, setLocation] = useState<number[]>([]);
  const [experience, setExpirience] = useState<number[]>([]);
  const [level, setLevel] = useState<number[]>([]);
  const [busyType, setBusyType] = useState<number[]>([]);
  const [workingType, setWorkingType] = useState<number[]>([]);

  return (
    <form className="filters">
      <div className="filters__header">
        <img className="filters__img" alt="settings" src={settings} />
        <h1 className="filters__title">Фильтры</h1>
      </div>
      <RadioGroupFilter
        value={profession}
        onChange={setProfession}
        data={professions}
        withBorder={false}
        defaultExpanded
      />
      <CheckboxGroupFilter title="Курс Практикума" value={course} data={professions} onChange={setCourse} />
      <CheckboxGroupFilter title="Навыки" withSearch value={skills} data={skillsData} onChange={setSkills} />
      <CheckboxGroupFilter title="Опыт работы" value={experience} data={professions} onChange={setExpirience} />
      <CheckboxGroupFilter title="Уровень" value={level} data={professions} onChange={setLevel} />
      <CheckboxGroupFilter title="Геопозиция" withSearch value={location} data={skillsData} onChange={setLocation} />
      <CheckboxGroupFilter title="Тип занятости" value={busyType} data={professions} onChange={setBusyType} />
      <CheckboxGroupFilter title="График работы" value={workingType} data={professions} onChange={setWorkingType} />
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
