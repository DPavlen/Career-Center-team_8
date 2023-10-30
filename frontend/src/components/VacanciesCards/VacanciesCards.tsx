import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
// import { useEffect } from 'react';
import VacancyCard from '../VacancyCard/VacancyCard';
import type { RootState } from '../../store/store';
import VacancySubtitle from '../VacancySubtitle/VacancySubtitle';
import { ICandidate } from '../../store/foundCandidates/foundCandidates';

function VacanciesCards() {
  const candidates: Partial<ICandidate[]> | null = useSelector(
    (state: RootState) => state.foundCandidates.candidates,
  );

  return (
    <>
      <VacancySubtitle />
      <section className="cards">
        {candidates && candidates?.map((card) => (
          card ? <VacancyCard key={uuid()} card={card} /> : null
        ))}
      </section>
    </>
  );
}

export default VacanciesCards;
