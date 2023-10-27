import './CreateVacancy.scss';
import Filters from '../../components/Filters/Filters';
import VacancyForm from '../../components/VacancyForm/VacancyForm';

function CreateVacancy() {
  return (
    <main className="create-vacancy">
      <div>
        <VacancyForm />
      </div>
      <Filters />
    </main>
  );
}

export default CreateVacancy;
