import Filters from '../../components/Filters/Filters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import './Candidates.css';

function Candidates() {
  return (
    <main>
      <Filters />
      <VacanciesCards />
    </main>
  );
}

export default Candidates;
