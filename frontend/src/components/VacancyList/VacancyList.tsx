import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreateVacancyCard from '../CreateVacancyCard/CreateVacancyCard';
import DynamicVacancyCard from '../DynamicVacancyCard/DynamicVacancyCard';
import './VacancyList.scss';

function VacancyList() {
  const vacancies = useSelector((store: RootState) => store.savedVacancies);
  return (
    <section className="vacancy-list">
      {/* <p className="vacancy-list__title">
      Добавьте вакансию, проставьте ключевые теги и мы подберем подходящих специалистов
      </p> */}
      <ul>

        {vacancies.map((vacancy) => (
          <li key={uuid()}>
            <DynamicVacancyCard data={vacancy} />
          </li>
        ))}
        <CreateVacancyCard />
        <CreateVacancyCard />
        <CreateVacancyCard />
      </ul>
    </section>
  );
}

export default VacancyList;
