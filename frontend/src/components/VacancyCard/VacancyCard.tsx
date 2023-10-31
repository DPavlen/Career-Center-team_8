import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import './VacancyCard.scss';
import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import {
  ICandidate,
  addCandidateToFavorites,
  removeCandidateFromFavorites,
} from '../../store/foundCandidates/foundCandidates';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';

interface VacancyCardProps {
  card: ICandidate;
}

function VacancyCard({ card }: VacancyCardProps) {
  const cardRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const asyncDispatch = useDispatch<any>();

  return (
    <article className={`card ${card.is_tracked ? 'card_checked' : ''}`}>
      <Link
        to={`/candidates/${card.id}`}
      >
        {/* <Checkbox
        disableRipple
        sx={{
          padding: 0, paddingTop: '17px', height: 'fit-content', width: 20,
        }}
        icon={<img alt="checkbox-field" src={checkbox} />}
        checkedIcon={<img alt="checkbox-field" src={checkboxChecked} />}
      /> */}
        <div ref={cardRef} className="card__info">
          <Avatar
            className="card__avatar"
            alt="Аватар пользователя"
            src={card.image}
            sx={{
              width: 53, height: 53, marginRight: '11px', marginLeft: 0,
            }}
            aria-label="recipe"
          />
          <div className="card__description">
            <div className="card__candidate-info">
              <p className="card__candidate-name">{`${card?.first_name} ${card?.last_name}`}</p>
              <p className="card__city">{card?.location}</p>
            </div>
            <h2 className="card__profession">{card?.specialization.split(', ')}</h2>
            <div className="card__experience">
              <p className="card__level">{card?.level}</p>
              <p className="card__attempt">
                Опыт работы:
                {' '}
                <span className="card__period">
                  {card.experience}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
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
          checked={card.is_tracked}
          onChange={(e) => {
            if (e.target.checked) {
              asyncDispatch(addCandidateToFavorites(card.id));
            } else {
              asyncDispatch(removeCandidateFromFavorites(card.id));
            }
          }}
        />
        {/* <p className="card__status">
          Статус:
          {' '}
          <span className="card__vacancy">
            вакансия отправлена
          </span>
        </p> */}
      </div>
    </article>
  );
}

export default VacancyCard;
