import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import VacancyCard from '../VacancyCard/VacancyCard';
import type { RootState } from '../../store/store';
import { ICandidate } from '../../store/candidates/candidates';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';

function VacanciesCards() {
  const candidates = useSelector((state:RootState) => state.foundCandidates.candidates);
  const total = useSelector((state:RootState) => state.foundCandidates.total);
  // Выбранных кандидатов в store закину чуть позже
  // font-family переделать
  return (
    <section className="cards">
      <div className="cards__info">
        <span className="cards__total">
          Показано
          {' '}
          {candidates.length}
          {' '}
          кандидатов из
          {' '}
          { total}
        </span>
        <div className="cards__selected">
          <span className="cards__choosen">
            Выбрано
            {' '}
            {candidates.length}
            {' '}
            из
            {' '}
            { total}
          </span>
          <Checkbox
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
          />
          <Button
            sx={{
              marginLeft: '8px', borderRadius: '6px', fontFamily: 'YS Text', textTransform: 'none', backgroundColor: 'var(--Blue)', width: 180, height: 32,
            }}
            variant="contained"
          >
            Отправить вакансию
          </Button>
        </div>
      </div>
      {candidates.map((card : ICandidate) => (
        <VacancyCard key={card.id} card={card} />
      ))}
    </section>
  );
}

export default VacanciesCards;
