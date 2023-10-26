import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import VacancyCard from '../VacancyCard/VacancyCard';
import type { RootState } from '../../store/store';
import { ICandidate } from '../../store/candidates/candidates';
import VacancySibtitle from '../VacancySubtitle/VacancySubtitle';

function VacanciesCards() {
  const candidates = useSelector((state: RootState) => state.foundCandidates.candidates);

  return (
    <>
      <VacancySibtitle />
      <section className="cards">
        {candidates.map((card: ICandidate) => (
          <VacancyCard key={uuid()} card={card} liked={false} />
        ))}
      </section>
    </>
  );
}

export default VacanciesCards;
