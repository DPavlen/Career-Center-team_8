import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import VacancyCard from '../Card/VacancyCard';
import type { RootState } from '../../store/store';
import { ICandidate } from '../../store/candidates/candidates';

function VacanciesCards() {
  const candidates = useSelector((state:RootState) => state.foundCandidates.candidates);

  return (
    <section className="cards">
      {candidates.map((card : ICandidate) => (
        <VacancyCard key={card.id} card={card} />
      ))}
    </section>
  );
}

export default VacanciesCards;
