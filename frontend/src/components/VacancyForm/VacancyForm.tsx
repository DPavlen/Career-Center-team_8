import Button from '@mui/material/Button';
import Filters from '../Filters/Filters';
import './VacancyForm.scss';

function VacancyForm() {
  return (
    <div className="vacancy-form">
      <h1 className="vacancy-form__title">Поиск кандидатов</h1>
      <Filters />
      <div className="vacancy-form__buttons">
        <Button variant="contained" color="success">Подобрать кандидатов</Button>
        <Button variant="contained" color="success">Отклики</Button>
      </div>
    </div>
  );
}

export default VacancyForm;
