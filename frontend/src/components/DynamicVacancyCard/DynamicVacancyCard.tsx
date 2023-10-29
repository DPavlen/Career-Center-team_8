import './DynamicVacancyCard.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import deleteIcon from '../../assets/icons/delete-grey.svg';
import DynamicVacancyInfo from '../DynamicVacancyInfo/DynamicVacancyInfo';
import { TSavedVacancies } from '../../store/savedVacancies/savedVacancies';

type VacancyCardProps = {
  data: TSavedVacancies;
}

function DynamicVacancyCard(props: VacancyCardProps) {
  const { data } = props;
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <article className="vacancy-card">
      <div className="vacancy-card__content">
        <h2 className="vacancy-card__title">{data.job_title}</h2>
        <p className="vacancy-card__subtitle">{data.company}</p>
        {!isShow && (
          <Button
            sx={{
              borderRadius: '6px',
              textTransform: 'none',
              fontSize: '14px',
              color: 'var(--Blue)',
              width: 'fit-content',
              padding: 0,
              marginBottom: '20px',
            }}
            onClick={() => setIsShow(true)}
          >
            Развернуть
          </Button>
        )}
        {isShow ? <DynamicVacancyInfo hide={() => setIsShow(false)} data={data} /> : null}
        <div className="vacancy-card__buttons">
          <Button
            sx={{
              borderRadius: '6px',
              textTransform: 'none',
              backgroundColor: 'var(--Blue)',
              width: 198,
              height: 32,
              fontSize: '14px',
              color: 'var(--White)',
            }}
            variant="contained"
          >
            Показать специалистов
          </Button>
          <Button
            className="vacancy-card__delete"
            sx={{
              textTransform: 'none',
              color: 'var(--Black-500)',
              fontSize: '14px',
              padding: 0,
              paddingLeft: '26px',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--Blue-Main)',
              },
            }}
            startIcon={
              <img src={deleteIcon} alt="иконка мусорки" />
            }
          >
            Удалить вакансию
          </Button>
        </div>
      </div>
    </article>
  );
}

export default DynamicVacancyCard;
