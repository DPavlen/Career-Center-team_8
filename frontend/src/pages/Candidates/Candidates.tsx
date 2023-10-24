import './Candidates.scss';
import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import Filters from '../../components/Filters/Filters';

function Candidates() {
  return (
    <main className="candidates" style={{ paddingLeft: '32px', display: 'grid', gridTemplateColumns: '1fr  minmax(auto, 382px)' }}>
      <div>
        <h1 className="title">Кандидаты</h1>
        <AppliedFilters />
        <VacanciesCards />
      </div>
      <Filters />
    </main>
  );
}

export default Candidates;
