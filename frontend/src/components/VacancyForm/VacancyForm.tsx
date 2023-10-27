import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import iconBack from '../../assets/icons/ic_back.svg';
import './VacancyForm.scss';
import VacancyInput from '../VacancyInput/VacancyInput';
import AppliedFilters from '../AppliedFilters/AppliedFilters';
import { RootState } from '../../store/store';
import { createVacancyResetFilter } from '../../store/vacanciesFilter/vacanciesFilter';

function VacancyForm() {
  const navigate = useNavigate();
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  const dispatch = useDispatch();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="vacancy-form">
      <div className="vacancy-form__header">
        <IconButton
          onClick={() => goBack()}
          sx={{
            height: 'fit-content',
            width: '24px',
          }}
        >
          <img alt="Иконка вернуться" src={iconBack} />
        </IconButton>
        <h1 className="vacancy-form__title">
          Новая вакансия
        </h1>
      </div>
      <form className="vacancy-form__content">
        <label className="vacancy-form__description">Должность*</label>
        <VacancyInput placeholder="Название должности" />
        <label className="vacancy-form__description">Компания*</label>
        <VacancyInput placeholder="Название компании" />
        <label className="vacancy-form__description">Уровень дохода</label>
        <div className="vacancy-form__salary">
          <VacancyInput placeholder="От" />
          <VacancyInput placeholder="До" />
        </div>
        <label className="vacancy-form__description">Обязательные требования*</label>
        <VacancyInput placeholder="Обязательные требования, которыми должен владеть кандидат" />
        <label className="vacancy-form__description">Необязательные требования</label>
        <VacancyInput placeholder="Необязательные навыки и требования, которые являются преимуществом" />
        <label className="vacancy-form__description">Обязанности*</label>
        <VacancyInput placeholder="Обязанности кандидата" />
        <label className="vacancy-form__description">Условия*</label>
        <VacancyInput placeholder="График, тип работы, соц пакет" />
        <label className="vacancy-form__description">Этапы отбора</label>
        <VacancyInput placeholder="Собеседования, тестовые, VCV" />
        <div className="vacancy-form__filter">
          <h2 className="vacancy-form__description">Фильтры*</h2>
          <p className="vacancy-form__choose-filter">Выберите не менее одного параметра в разделе &quot;Фильтр&quot; справа</p>
          <AppliedFilters
            filterValue={filterValue}
            onResetFilter={(filter) => dispatch(createVacancyResetFilter(filter))}
          />
        </div>
      </form>
      <div>
        <Button
          onClick={() => navigate('/create-vacancy')}
          sx={{
            borderRadius: '6px',
            textTransform: 'none',
            backgroundColor: 'var(--Blue-Main)',
            width: 242,
            height: 52,
            fontSize: '16px',
            textColor: 'var(--White)',
            marginBottom: '100px',
            marginTop: '24px',
            '&.Mui-disabled': { backgroundColor: 'var(--Black-300)', color: 'var(--White)' },
          }}
          variant="contained"
          disabled
        >
          Создать вакансию
        </Button>
        <Button
          href="/create-vacancy"
          sx={{
            borderRadius: '6px',
            textTransform: 'none',
            width: 242,
            height: 52,
            fontSize: '16px',
            color: 'var(--Blue-Main)',
            marginLeft: '8px',
            marginBottom: '100px',
            marginTop: '24px',
          }}
          variant="outlined"
        >
          Отменить
        </Button>
      </div>
    </main>
  );
}

export default VacancyForm;
