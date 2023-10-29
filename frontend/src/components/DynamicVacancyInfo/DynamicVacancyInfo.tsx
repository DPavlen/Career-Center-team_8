import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';
import './DynamicVacancyInfo.scss';
import RequirementsList from '../RequirementsList/RequirementsList';

function extractValue(object: object) {
  const result: string[] = [];

  if (!object) {
    return [];
  }

  // eslint-disable-next-line consistent-return
  Object.entries(object).forEach(([, value]) => {
    if (typeof value === 'string') {
      return result.push(value);
    }
    if (Array.isArray(value)) {
      return result.push(...value);
    }
    if (typeof value === 'object') {
      return result.push(...extractValue(value));
    }
  });

  return result;
}

interface VacancyInfoProps {
  hide: () => void,
  data: TSavedVacancies,
}

function DynamicVacancyInfo({ hide, data }: VacancyInfoProps) {
  const [chips, setChips] = useState<string[]>([]);

  useEffect(() => {
    setChips(extractValue(data?.filters || {}));
  }, [setChips, data]);

  return (
    <section className="vacancy-info">
      <div className="vacancy-info__chips">
        {chips.map((chip) => (
          <span key={uuid()} className="vacancy-info__skills">{chip}</span>
        ))}
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
