import CreateVacancyCard from '../CreateVacancyCard/CreateVacancyCard';
import './VacancyList.scss';

function VacancyList() {
  return (
    <section className="vacancy-list">
      <CreateVacancyCard />
      <CreateVacancyCard />
      <CreateVacancyCard />
    </section>
  );
}

export default VacancyList;
