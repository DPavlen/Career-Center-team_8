import Button from '@mui/material/Button';
import { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';
import './DynamicVacancyInfo.scss';
import RequirementsList from '../RequirementsList/RequirementsList';

interface VacancyInfoProps {
  hide: () => void,
  data: TSavedVacancies,
}

function DynamicVacancyInfo({ hide, data }: VacancyInfoProps) {
  return (
    <section className="vacancy-info">
      <div className="vacancy-info__chips">
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
        <span className="vacancy-info__skills">Без опыта</span>
        <span className="vacancy-info__skills">От 0 до 3 лет</span>
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
        <span className="vacancy-info__skills">Без опыта</span>
        <span className="vacancy-info__skills">От 0 до 3 лет</span>
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
      </div>
      {(data.salary_from || data.salary_to) && (
        <h3 className="vacancy-info__cash">
          Заработная плата
          {data.salary_from && (
            <span className="vacancy-info__wages">
              {`от ${data.salary_from}`}
            </span>
          )}
          {data.salary_to && (
            <span className="vacancy-info__wages">
              {`до ${data.salary_to}`}
            </span>
          )}
          <span>рублей</span>
        </h3>
      )}
      <h3 className="vacancy-info__title">Обязанности</h3>
      <ul>
        <RequirementsList data={data.responsibilities} />
      </ul>
      <h3 className="vacancy-info__title">Требования обязательные</h3>
      <ul>
        <RequirementsList data={data.required_requirements} />
      </ul>
      {data.optional_requirements && (
        <>
          <h3 className="vacancy-info__title">Требования необязательные</h3>
          <ul>
            <RequirementsList data={data.optional_requirements} />
          </ul>
        </>
      )}
      <h3 className="vacancy-info__title">Условия</h3>
      <ul>
        <RequirementsList data={data.conditions} />
      </ul>
      {data.selection_stages && (
        <>
          <h3 className="vacancy-info__title">Этапы отбора</h3>
          <ol>
            <RequirementsList data={data.selection_stages} ordered />
          </ol>
        </>
      )}
      <Button
        sx={{
          borderRadius: '6px',
          textTransform: 'none',
          fontSize: '14px',
          color: 'var(--Blue)',
          width: 'fit-content',
          padding: 0,
          marginBottom: '16px',
          marginTop: '16px',
          '&:hover': { backgroundColor: 'white' },
        }}
        onClick={() => hide()}
      >
        Свернуть
      </Button>
    </section>
  );
}

export default DynamicVacancyInfo;
