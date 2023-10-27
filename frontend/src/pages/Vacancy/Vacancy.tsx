import './Vacancy.scss';
import Button from '@mui/material/Button';
import plus from '../../assets/icons/plus.svg';
import VacancyList from '../../components/VacancyList/VacancyList';

function Vacancy() {
  return (
    <main>
      <header className="vacancy">
        <h1 className="vacancy__title">
          Вакансии
        </h1>
        <Button
          href="/create-vacancy"
          startIcon={<img alt="plus-icon" src={plus} />}
          sx={{
            borderRadius: '6px',
            textTransform: 'none',
            backgroundColor: 'var(--Blue)',
            width: 196,
            height: 40,
            fontSize: '14px',
            color: 'var(--White)',
          }}
          variant="contained"
        >
          Создать вакансию
        </Button>
      </header>
      <VacancyList />
    </main>
  );
}

export default Vacancy;
