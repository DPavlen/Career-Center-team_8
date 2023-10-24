import './Filters.scss';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import settings from '../../assets/icons/settings.svg';
import Filter from '../Filter/Filter';
import professions from '../../utils/testProfessionArea.json';
import RadioGroupFilter from '../RadioGroupFilter/RadioGroupFilter';

function Filters() {
  const [profession, setProfession] = useState<string | null>(null);

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
      <Filter text="Курс Практикума">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="Навыки">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="Опыт работы">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="Уровень">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="Геопозиция">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="Тип занятости">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <Filter text="График работы">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Filter>
      <div className="filters__separator" />
    </form>
  );
}

export default Filters;
