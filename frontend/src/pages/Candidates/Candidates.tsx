import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Candidates.scss';

import Typography from '@mui/material/Typography';

import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import Filters from '../../components/Filters/Filters';

import { RootState } from '../../store/store';
import { vacanciesFilterResetAllFilters, vacanciesFilterResetFilter, vacanciesFilterSetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { IFiltersOptions } from '../../store/filter';

import { addCandidates } from '../../store/foundCandidates/foundCandidates';

import mainApi from '../../utils/MainApi';

function Candidates() {
  const filterValue = useSelector((state: RootState) => state.vacanciesFilter);
  const filtersOptions: IFiltersOptions = useSelector(
    (state: RootState) => state.foundCandidates.filtersOptions,
  );

  const dispatch = useDispatch();

  function filterCandidates() {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getFilterCandidates(token, filterValue)
        .then((foundCandidates) => {
          dispatch(addCandidates({ candidates: foundCandidates }));
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => filterCandidates(), [filterValue]);

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
        filtersOptions={filtersOptions}
        filterValue={filterValue}
        onResetAllFilters={() => dispatch(vacanciesFilterResetAllFilters())}
        onSetFilter={(filter) => dispatch(vacanciesFilterSetFilter(filter))}
      />
    </main>
  );
}

export default Candidates;
