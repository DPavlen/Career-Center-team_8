import './Candidates.scss';
import Typography from '@mui/material/Typography';
import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
// import Filters from '../../components/Filters/Filters';

function Candidates() {
  return (
    <main style={{ paddingLeft: '32px' }}>
      <Typography variant="h1">
        Кандидаты
      </Typography>
      <AppliedFilters />
      <VacanciesCards />
    </main>
  );
}

export default Candidates;
