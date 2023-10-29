import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import iconBack from '../../assets/icons/ic_back.svg';
import './VacancyForm.scss';
// import VacancyInput from '../VacancyInput/VacancyInput';
import AppliedFilters from '../AppliedFilters/AppliedFilters';
import { RootState } from '../../store/store';
import { createVacancyResetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { addVacancy } from '../../store/savedVacancies/savedVacancies';
import type { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';

function VacancyForm() {
  const navigate = useNavigate();
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm<TSavedVacancies>();
  const submit: SubmitHandler<TSavedVacancies> = (data) => {
    dispatch(addVacancy(data));
    navigate('/vacancies');
  };

  function goBack() {
    navigate('/vacancies');
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
      {/* <form className="vacancy-form__content">
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
        <VacancyInput
        placeholder="Необязательные навыки и требования, которые являются преимуществом"
        />
        <label className="vacancy-form__description">Обязанности*</label>
        <VacancyInput placeholder="Обязанности кандидата" />
        <label className="vacancy-form__description">Условия*</label>
        <VacancyInput placeholder="График, тип работы, соц пакет" />
        <label className="vacancy-form__description">Этапы отбора</label>
        <VacancyInput placeholder="Собеседования, тестовые, VCV" />
        <div className="vacancy-form__filter">
          <h2 className="vacancy-form__description">Фильтры*</h2>
          <p className="vacancy-form__choose-filter">
          Выберите не менее одного параметра в разделе &quot;Фильтр&quot; справа
          </p>
          <AppliedFilters
            filterValue={filterValue}
            onResetFilter={(filter) => dispatch(createVacancyResetFilter(filter))}
          />
        </div>
      </form> */}

      <form className="vacancy-form__content" onSubmit={handleSubmit(submit)}>
        <label className="vacancy-form__description">Должность*</label>
        <input
          placeholder="Название должности"
          {...register('job_title', { required: true })}
        />
        <label className="vacancy-form__description">Компания*</label>
        <input
          placeholder="Название компании"
          {...register('company', { required: true })}
        />
        <label className="vacancy-form__description">Уровень дохода</label>
        <div className="vacancy-form__salary">
          <input placeholder="От" {...register('salary_from')} />
          <input placeholder="До" {...register('salary_to')} />
        </div>
        <label className="vacancy-form__description">Обязательные требования*</label>
        <input
          placeholder="Обязательные требования, которыми должен владеть кандидат. перечисление через зяпятую"
          {...register('required_requirements', { required: true })}
        />
        <label className="vacancy-form__description">Необязательные требования</label>
        <input
          placeholder="Необязательные навыки и требования, которые являются преимуществом. перечисление через зяпятую"
          {...register('optional_requirements')}
        />
        <label className="vacancy-form__description">Обязанности*</label>
        <input
          placeholder="Обязанности кандидата. перечисление через зяпятую"
          {...register('responsibilities', { required: true })}
        />
        <label className="vacancy-form__description">Условия*</label>
        <input
          placeholder="График, тип работы, соц пакет. перечисление через зяпятую"
          {...register('conditions', { required: true })}
        />
        <label className="vacancy-form__description">Этапы отбора</label>
        <input
          placeholder="Собеседования, тестовые, VCV. перечисление через зяпятую"
          {...register('selection_stages')}
        />
        <div className="vacancy-form__filter">
          <h2 className="vacancy-form__description">Фильтры*</h2>
          <p className="vacancy-form__choose-filter">
            Выберите не менее одного параметра в разделе &quot;Фильтр&quot; справа
          </p>
          <AppliedFilters
            filterValue={filterValue}
            onResetFilter={(filter) => dispatch(createVacancyResetFilter(filter))}
          />
        </div>
        <div>

          <Button
            // onClick={}
            type="submit"
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
          // disabled
          >
            Создать вакансию
          </Button>
          <Button
            onClick={() => reset()}
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
      </form>
    </main>
  );
}

export default VacancyForm;
