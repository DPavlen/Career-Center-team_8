import { useSelector } from 'react-redux';

import './VacancySubtitle.scss';

import type { RootState } from '../../store/store';

function VacancySubtitle() {
  const total = useSelector((state:RootState) => state.foundCandidates.total);

  return (
    <div className="vacancy-subtitle">
      <span className="vacancy-subtitle__total">
        Показано
        {' '}
        {total}
        {' '}
        кандидатов
      </span>
      <div className="vacancy-subtitle__selected" />
    </div>
  );
}

export default VacancySubtitle;
