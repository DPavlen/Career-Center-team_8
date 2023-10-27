import './CreateVacancyCard.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import VacancyInfo from '../VacancyInfo/VacancyInfo';

function CreateVacancyCard() {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <article className="vacancy-card">
      <div className="vacancy-card__content">
        <h2 className="vacancy-card__title">Графический дизайнер/ Дизайнер UX/UI</h2>
        <p className="vacancy-card__subtitle">Цифровые продукты</p>
        <Button
          sx={{
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '14px',
            color: 'var(--Blue)',
            width: 'fit-content',
            padding: 0,
            marginBottom: '16px',
          }}
          onClick={() => setIsShow(true)}
        >
          Развернуть
        </Button>
        { isShow ? <VacancyInfo hide={() => setIsShow(false)} /> : null }
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
          <div className="vacancy-card__delete">
            <Button
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
            >
              Удалить вакансию
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CreateVacancyCard;
