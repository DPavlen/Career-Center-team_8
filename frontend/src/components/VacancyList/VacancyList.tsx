import { v4 as uuid } from 'uuid';
import './VacancyList.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import DynamicVacancyCard from '../DynamicVacancyCard/DynamicVacancyCard';

function VacancyList() {
  const vacancies = useSelector((store: RootState) => store.savedVacancies);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(vacancies.length === 0);
  }, [vacancies]);

  return (
    <section className="vacancy-list">
      {isEmpty ? (
        <p className="vacancy-list__title">
          Добавьте вакансию, проставьте ключевые теги и мы подберем подходящих специалистов
        </p>
      ) : null}
      <ul>

        {vacancies.map((vacancy) => (
          <li key={uuid()}>
            <DynamicVacancyCard data={vacancy} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VacancyList;
