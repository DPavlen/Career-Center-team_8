import CreateVacancyCard from '../CreateVacancyCard/CreateVacancyCard';
import './VacancyList.scss';

function VacancyList() {
  return (
    <section className="vacancy-list">
      {/* <p className="vacancy-list__title">
      Добавьте вакансию, проставьте ключевые теги и мы подберем подходящих специалистов
      </p> */}
      <CreateVacancyCard />
      <CreateVacancyCard />
      <CreateVacancyCard />
    </section>
  );
}

export default VacancyList;
