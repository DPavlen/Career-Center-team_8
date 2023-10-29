import './CreateVacancy.scss';
import { useSelector, useDispatch } from 'react-redux';
import Filters from '../../components/Filters/Filters';
import VacancyForm from '../../components/VacancyForm/VacancyForm';
import { RootState } from '../../store/store';
import { createVacancyResetAllFilters, createVacancySetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { IFiltersOptions } from '../../store/filter';

function CreateVacancy() {
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  const filtersOptions: IFiltersOptions = useSelector(
    (state: RootState) => state.foundCandidates.filtersOptions,
  );
  const dispatch = useDispatch();

  return (
    <main className="create-vacancy">
      <div>
        <VacancyForm />
      </div>
      <Filters
        filterValue={filterValue}
        filtersOptions={filtersOptions}
        onResetAllFilters={() => dispatch(createVacancyResetAllFilters())}
        onSetFilter={(filter) => dispatch(createVacancySetFilter(filter))}
      />
    </main>
  );
}

export default CreateVacancy;
