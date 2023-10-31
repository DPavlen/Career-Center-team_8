import { useSelector } from 'react-redux';

import './Experience.scss';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../store/store';

function Experience() {
  const candidate = useSelector((state: RootState) => state.candidateInfo.candidate);

  function createDateString(yearStart: number, yearEnd?: number): string {
    if (yearEnd) {
      return `C ${yearStart} по ${yearEnd} год`;
    }

    return `C ${yearStart} по настоящее время`;
  }

  return (
    <section className="experience">
      <h2 className="experience__title">Опыт работы</h2>
      <ul className="experience__list">
        {candidate
          && candidate.experience_detailed
          && candidate.experience_detailed.map((detail) => (
            <li key={uuid()} className="experience__detail">
              <h3 className="experience__date">{createDateString(detail.date_start, detail.date_end)}</h3>
              <p className="experience__name">{detail.name}</p>
              <p className="experience__post">{detail.post}</p>
              <p className="experience__responsibilities">{detail.responsibilities}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Experience;
