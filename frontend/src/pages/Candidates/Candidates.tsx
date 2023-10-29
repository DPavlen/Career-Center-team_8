import { useDispatch, useSelector } from 'react-redux';

import './Candidates.scss';

import Typography from '@mui/material/Typography';

import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import Filters from '../../components/Filters/Filters';

import { RootState } from '../../store/store';
import { vacanciesFilterResetAllFilters, vacanciesFilterResetFilter, vacanciesFilterSetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { AllFilters } from '../../store/candidates/candidates';

function Candidates() {
  const filterValue = useSelector((state: RootState) => state.vacanciesFilter);
  const filters: AllFilters = useSelector((state: RootState) => state.foundCandidates.allFilters);

  const dispatch = useDispatch();

  return (
    <main className="candidates">
      <div>
        <Typography variant="h1">
          Кандидаты
        </Typography>
        <AppliedFilters
          filterValue={filterValue}
          onResetFilter={(filter) => dispatch(vacanciesFilterResetFilter(filter))}
        />
        <VacanciesCards />
      </div>
      <Filters
        filters={filters}
        filterValue={filterValue}
        onResetAllFilters={() => dispatch(vacanciesFilterResetAllFilters())}
        onSetFilter={(filter) => dispatch(vacanciesFilterSetFilter(filter))}
      />
    </main>
  );
}

export default Candidates;
