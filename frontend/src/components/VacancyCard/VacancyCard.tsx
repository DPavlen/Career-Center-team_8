import Avatar from '@mui/material/Avatar';
import './VacancyCard.scss';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { ICandidate } from '../../store/candidates/candidates';
import checkboxChecked from '../../assets/icons/checkboxChecked.svg';
import checkbox from '../../assets/icons/checkbox.svg';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';

interface VacancyCardProps {
  card : ICandidate;
}

// стили переименовать, статус ???

function VacancyCard({ card } : VacancyCardProps) {
  const [checked, setChecked] = useState(false);

  return (
    <article className={`card ${checked ? 'card_checked' : ''}`}>
      <Checkbox
        disableRipple
        sx={{
          padding: 0, paddingTop: '17px', height: 'fit-content', width: 20,
        }}
        icon={<img alt="checkbox-field" src={checkbox} />}
        checkedIcon={<img alt="checkbox-field" src={checkboxChecked} />}
      />
      <div className="card__info">
        <Avatar className="card__avatar" alt="Аватар пользователя" src={card.photo} sx={{ width: 53, height: 53, marginRight: '11px' }} aria-label="recipe" />
        <div className="card__description">
          <div className="card__candidate-info">
            <p className="card__candidate-name">{card.name}</p>
            <p className="card__city">{card.city}</p>
          </div>
          <h2 className="card__profession">{card.profession}</h2>
          <div className="card__experience">
            <p className="card__level">{card.level}</p>
            <p className="card__attempt">
              Опыт работы:
              {' '}
              <span className="card__period">
                {card.experience}
                {' '}
                месяцев
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="card__favorite">
        <Checkbox
          className="card__checkbox"
          disableRipple
          sx={{
            padding: '6px',
            backgroundColor: 'var(--Blue-BG)',
            height: 'fit-content',
            width: '32px',
            borderRadius: '6px',
          }}
          icon={<img alt="checkbox-field" src={like} />}
          checkedIcon={<img alt="checkbox-field" src={likeFilled} />}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        <p className="card__status">
          Статус:
          {' '}
          <span className="card__vacancy">
            вакансия отправлена
          </span>
        </p>
      </div>
    </article>
  );
}

export default VacancyCard;
