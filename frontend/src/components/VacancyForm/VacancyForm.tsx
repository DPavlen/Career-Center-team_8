import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Controller, FormProvider, Resolver, SubmitHandler, useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import iconBack from '../../assets/icons/ic_back.svg';
import './VacancyForm.scss';
import VacancyInput from '../VacancyInput/VacancyInput';
import AppliedFilters from '../AppliedFilters/AppliedFilters';
import { RootState } from '../../store/store';
import { createVacancyResetAllFilters, createVacancyResetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { addVacancy } from '../../store/savedVacancies/savedVacancies';
import type { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';
import { vacancyFormScheme } from '../../scheme/formScheme';

function VacancyForm() {
  const navigate = useNavigate();
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  const dispatch = useDispatch();

  const initialData = localStorage.getItem('CREATE_VACANCY_FORM');

  const methods = useForm<Omit<TSavedVacancies, 'filters'>>({
    defaultValues: initialData ? JSON.parse(initialData) : {
      // eslint-disable-next-line camelcase
      job_title: '',
      company: '',
      // eslint-disable-next-line camelcase
      required_requirements: '',
      responsibilities: '',
      conditions: '',
    },
    resolver: yupResolver<Omit<TSavedVacancies, 'filters'>>(vacancyFormScheme) as Resolver<Omit<TSavedVacancies, 'filters'>>,
  });

  const {
    control, handleSubmit, watch, formState: { errors },
  } = methods;

  function resetForm() {
    localStorage.removeItem('CREATE_VACANCY_FORM');
    navigate('/');
    dispatch(createVacancyResetAllFilters());
  }

  const submit: SubmitHandler<Omit<TSavedVacancies, 'filters'>> = (data) => {
    dispatch(addVacancy({
      ...data,
      filters: filterValue,
    }));
    resetForm();
  };

  function goBack() {
    navigate('/vacancies');
  }

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('CREATE_VACANCY_FORM', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
      <FormProvider {...methods}>
        <label className="vacancy-form__description">Должность*</label>
        <Controller
          name="job_title"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VacancyInput errorMessage={errors.job_title?.message} value={value} onChange={onChange} placeholder="Дизайнер интерфейсов" />
          )}
        />
        <label className="vacancy-form__description">Компания*</label>
        <Controller
          name="company"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VacancyInput errorMessage={errors.company?.message} value={value} onChange={onChange} placeholder="Название компании" />
          )}
        />
        <label className="vacancy-form__description">Уровень дохода</label>
        <div className="vacancy-form__salary">
          <Controller
            name="salary_from"
            control={control}
            render={({ field: { value, onChange } }) => (
              <VacancyInput errorMessage={errors.salary_from?.message} value={value || ''} onChange={onChange} placeholder="от 40000" />
            )}
          />
          <Controller
            name="salary_to"
            control={control}
            render={({ field: { value, onChange } }) => (
              <VacancyInput errorMessage={errors.salary_to?.message} value={value || ''} onChange={onChange} placeholder="до 60000" />
            )}
          />
        </div>
        <label className="vacancy-form__description">Обязательные требования*</label>
        <Controller
          name="required_requirements"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value} errorMessage={errors.required_requirements?.message} onChange={onChange} placeholder="Обязательные требования, которыми должен обладать кандидат" />
          )}
        />
        <label className="vacancy-form__description">Необязательные требования</label>
        <Controller
          name="optional_requirements"
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value || ''} errorMessage={errors.required_requirements?.message} onChange={onChange} placeholder="Необязательные навыки и требования, которые будут преимуществом" />
          )}
        />
        <label className="vacancy-form__description">Обязанности*</label>
        <Controller
          name="responsibilities"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value} errorMessage={errors.responsibilities?.message} onChange={onChange} placeholder="Обязанности кандидата" />
          )}
        />
        <label className="vacancy-form__description">Условия*</label>
        <Controller
          name="conditions"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value || ''} errorMessage={errors.conditions?.message} onChange={onChange} placeholder="График, тип работы, соц пакет" />
          )}
        />
        <label className="vacancy-form__description">Этапы отбора</label>
        <Controller
          name="selection_stages"
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value || ''} errorMessage={errors.selection_stages?.message} onChange={onChange} placeholder="Собеседования, тестовые, VCV" />
          )}
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
            onClick={handleSubmit(submit)}
            sx={{
              borderRadius: '6px',
              textTransform: 'none',
              backgroundColor: 'var(--Blue)',
              width: 242,
              height: 52,
              fontSize: '16px',
              color: 'var(--White)',
              marginBottom: '100px',
              marginTop: '24px',
              '&.Mui-disabled': { backgroundColor: 'var(--Black-300)', color: 'var(--White)' },
            }}
            variant="contained"
          >
            Создать вакансию
          </Button>
          <Button
            onClick={() => resetForm()}
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
      </FormProvider>
    </main>
  );
}

export default VacancyForm;
