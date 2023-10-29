import './VacanciesCards.scss';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import VacancyCard from '../VacancyCard/VacancyCard';
import type { RootState } from '../../store/store';
import VacancySibtitle from '../VacancySubtitle/VacancySubtitle';
// import { useEffect } from 'react';

function VacanciesCards() {
  const candidates = useSelector((state: RootState) => state.foundCandidates.candidates);

  return (
    <>
      <VacancySibtitle />
      <section className="cards">
        {candidates?.map((card) => (
          card ? <VacancyCard key={uuid()} card={card} liked={false} /> : null
        ))}
      </section>
    </>
  );
}

export default VacanciesCards;
