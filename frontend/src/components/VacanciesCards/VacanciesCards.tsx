import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import VacancyCard from '../VacancyCard/VacancyCard';
import type { RootState } from '../../store/store';
import { ICandidate } from '../../store/candidates/candidates';
import VacancySend from '../VacancySend/VacancySend';

function VacanciesCards() {
  const candidates = useSelector((state:RootState) => state.foundCandidates.candidates);

  return (
    <section className="cards">
      <VacancySend />
      {candidates.map((card : ICandidate) => (
        <VacancyCard key={card.id} card={card} />
      ))}
    </section>
  );
}

export default VacanciesCards;
