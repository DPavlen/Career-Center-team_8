import './CreateVacancy.scss';
import { useSelector, useDispatch } from 'react-redux';
import Filters from '../../components/Filters/Filters';
import VacancyForm from '../../components/VacancyForm/VacancyForm';
import { RootState } from '../../store/store';
import { createVacancyResetAllFilters, createVacancySetFilter } from '../../store/vacanciesFilter/vacanciesFilter';

function CreateVacancy() {
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  const dispatch = useDispatch();

  return (
    <main className="create-vacancy">
      <div>
        <VacancyForm />
      </div>
      <Filters
        filterValue={filterValue}
        onResetAllFilters={() => dispatch(createVacancyResetAllFilters())}
        onSetFilter={(filter) => dispatch(createVacancySetFilter(filter))}
      />
    </main>
  );
}

export default CreateVacancy;
