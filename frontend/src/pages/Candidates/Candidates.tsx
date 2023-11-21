import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Candidates.scss';

import Typography from '@mui/material/Typography';

import { Pagination } from '@mui/material';
import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import VacanciesCards from '../../components/VacanciesCards/VacanciesCards';
import Filters from '../../components/Filters/Filters';

import { RootState } from '../../store/store';
import {
  vacanciesFilterResetAllFilters, vacanciesFilterResetFilter, vacanciesFilterSetFilter,
} from '../../store/vacanciesFilter/vacanciesFilter';
import { IFiltersOptions } from '../../store/filter';

import { addCandidates, saveFilters } from '../../store/foundCandidates/foundCandidates';

import mainApi from '../../utils/MainApi';

function Candidates() {
  const filterValue = useSelector((state: RootState) => state.vacanciesFilter);
  const total: number = useSelector((state: RootState) => state.foundCandidates.total);
  const filtersOptions: IFiltersOptions = useSelector(
    (state: RootState) => state.foundCandidates.filtersOptions,
  );

  const dispatch = useDispatch();

  function filterCandidates() {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getFilterCandidates(filterValue)
        .then((response) => {
          dispatch(addCandidates(response.data));
        })
        .catch((err) => console.log(err));
      Object.keys(filtersOptions).forEach((field) => {
        mainApi.getFilterValues(field)
          .then((response) => {
            const sortedArray = response.data.map((element: {[key: string] : string | number}) => (
              field === 'location' ? element.location : element.name
            ));
            dispatch(saveFilters({ name: field, data: sortedArray }));
          })
          .catch((err) => console.log(err));
      });
    }
  }
  const getPage = (number: number) => {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getParticularPage(number)
        .then((response) => {
          dispatch(addCandidates(response.data));
        })
        .catch((err) => console.log(err));
    }
  };

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
      <Pagination
        className="candidates__pagination"
        shape="rounded"
        count={Math.ceil(total / 10)}
        onChange={(_, number) => getPage(number)}
      />
    </main>
  );
}

export default Candidates;
