import { v4 as uuid } from 'uuid';
import './VacancyList.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import DynamicVacancyCard from '../DynamicVacancyCard/DynamicVacancyCard';
import { getVacancies } from '../../store/savedVacancies/savedVacancies';

function VacancyList() {
  const vacancies = useSelector((store: RootState) => store.savedVacancies.vacancies);
  const dispatch = useDispatch<AppDispatch>();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(vacancies.length === 0);
  }, [vacancies]);

  useEffect(() => {
    dispatch(getVacancies());
  }, []);

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
