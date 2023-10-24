import './Candidates.css';

import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';

function Candidates() {
  return (
    <main style={{ paddingLeft: '32px' }}>
      <h1 className="title">Кандидаты</h1>
      <AppliedFilters />
      <VacanciesCards />
    </main>
  );
}

export default Candidates;
