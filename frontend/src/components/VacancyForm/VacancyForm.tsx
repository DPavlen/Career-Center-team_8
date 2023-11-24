import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Controller,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './VacancyForm.scss';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import iconBack from '../../assets/icons/ic_back.svg';

import VacancyInput from '../VacancyInput/VacancyInput';
import AppliedFilters from '../AppliedFilters/AppliedFilters';

import { RootState } from '../../store/store';
import { createVacancyResetAllFilters, createVacancyResetFilter } from '../../store/vacanciesFilter/vacanciesFilter';
import { createVacancy } from '../../store/savedVacancies/savedVacancies';
import type { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';
import { vacancyFormScheme } from '../../scheme/formScheme';

function VacancyForm() {
  const navigate = useNavigate();
  const filterValue = useSelector((state: RootState) => state.createVacancyFilter);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const initialData = localStorage.getItem('CREATE_VACANCY_FORM');

  const methods = useForm<Omit<TSavedVacancies, 'filters' | 'id'>>({
    defaultValues: initialData ? JSON.parse(initialData) : {
      name: '',
      company: '',
      requirements: '',
      responsibilities: '',
      conditions: '',
    },
    resolver: yupResolver<Omit<TSavedVacancies, 'filters' | 'id'>>(vacancyFormScheme) as Resolver<Omit<TSavedVacancies, 'filters' | 'id'>>,
  });

  const {
    control, handleSubmit, watch, formState: { errors }, setError, clearErrors,
  } = methods;

  const [filterCheckedOnce, setFitlersCheckedOnce] = useState<boolean>(false);

  const resetForm = useCallback(() => {
    localStorage.removeItem('CREATE_VACANCY_FORM');
    navigate('/vacancies');
    dispatch(createVacancyResetAllFilters());
  }, [dispatch, navigate]);

  const validateFilter = useCallback(() => {
    if (filterValue.specialization_id) {
      clearErrors('root');
      return true;
    }

    setError('root', { message: 'filters error', type: 'custom' });
    return false;
  }, [filterValue, setError, clearErrors]);

  const submit: SubmitHandler<Omit<TSavedVacancies, 'filters' | 'id'>> = async (data) => {
    setFitlersCheckedOnce(true);
    const filterValidation: boolean = await validateFilter();

    if (filterValidation) {
      dispatch(createVacancy({
        ...data,
        filters: filterValue,
      }));
      resetForm();
    }
  };

  const invalidSubmit = async () => {
    setFitlersCheckedOnce(true);
    await validateFilter();
  };

  useEffect(() => {
    if (filterCheckedOnce) {
      validateFilter();
    }
  }, [filterValue, validateFilter]);

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
            position: 'absolute',
            top: 'center',
            left: '-104px',
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
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VacancyInput errorMessage={errors.name?.message} value={value} onChange={onChange} placeholder="Дизайнер интерфейсов" />
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
            name="salaryLow"
            control={control}
            render={({ field: { value, onChange } }) => (
              <VacancyInput errorMessage={errors.salaryLow?.message} value={value || ''} onChange={(v) => onChange(Number(v))} placeholder="от 40000" />
            )}
          />
          <Controller
            name="salaryHigh"
            control={control}
            render={({ field: { value, onChange } }) => (
              <VacancyInput errorMessage={errors.salaryHigh?.message} value={value || ''} onChange={(v) => onChange(Number(v))} placeholder="до 60000" />
            )}
          />
        </div>
        <label className="vacancy-form__description">Обязательные требования*</label>
        <Controller
          name="requirements"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value} errorMessage={errors.requirements?.message} onChange={onChange} placeholder="Обязательные требования, которыми должен обладать кандидат" />
          )}
        />
        <label className="vacancy-form__description">Необязательные требования</label>
        <Controller
          name="optional"
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value || ''} errorMessage={errors.optional?.message} onChange={onChange} placeholder="Необязательные навыки и требования, которые будут преимуществом" />
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
          name="stages"
          control={control}
          render={({ field: { value, onChange } }) => (
            <VacancyInput value={value || ''} errorMessage={errors.stages?.message} onChange={onChange} placeholder="Собеседования, тестовые, VCV" />
          )}
        />
        <div className="vacancy-form__filter">
          <h2 className="vacancy-form__description">Фильтры*</h2>
          <p className={`vacancy-form__choose-filter ${errors.root ? 'vacancy-form__choose-filter_error' : ''}`}>
            Выберите не менее одного параметра в разделе &quot;Фильтр&quot; справа
          </p>
          <AppliedFilters
            filterValue={filterValue}
            // alwaysShow
            onResetFilter={(filter) => dispatch(createVacancyResetFilter(filter))}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit(submit, invalidSubmit)}
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
