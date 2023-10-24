import Typography from '@mui/material/Typography';
import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import './Candidates.css';

function Candidates() {
  return (
    <main style={{ paddingLeft: '32px' }}>
      <Typography
        variant="h3"
        sx={{
          color: 'black',
          mt: 4,
          mb: 4,
        }}
      >
        Кандидаты
      </Typography>
      <AppliedFilters />
      <VacanciesCards />
    </main>
  );
}

export default Candidates;
