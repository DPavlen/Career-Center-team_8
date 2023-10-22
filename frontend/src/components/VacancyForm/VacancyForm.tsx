import Button from '@mui/material/Button';
import Filters from '../Filters/Filters';
import './VacancyForm.scss';
import Link from '@mui/material/Link';

function VacancyForm() {
  return (
    <div className="vacancy-form">
      <h1 className="vacancy-form__title">Поиск кандидатов</h1>
      <Filters />
      <div className="vacancy-form__buttons">
        <Link href='/candidates'>
          <Button variant="contained" color="success">Подобрать кандидатов</Button>
        </Link>
        <Link href='/callbacks'>
          <Button variant="contained" color="success">Отклики</Button>
        </Link>
      </div>
    </div>
  );
}

export default VacancyForm;
