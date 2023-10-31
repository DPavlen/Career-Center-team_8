/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import './Favorites.scss';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { RootState } from '../../store/store';
import Specialty from '../../components/Specialty/Specialty';
import { getFavoriteCandidates } from '../../store/favoriteCandidates/favoriteCandidates';
import { ICandidate } from '../../store/foundCandidates/foundCandidates';

function Favorites() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const favoritesList = useSelector((store: RootState) => {
    const { candidates } = store.favoritesVacancies;

    return candidates.reduce((rv: Record<string, ICandidate[]>, x: ICandidate) => {
      // eslint-disable-next-line no-param-reassign
      rv[x.specialization] = rv[x.specialization] || [];
      rv[x.specialization].push(x);
      return rv;
    }, {});
  });

  const total = useSelector((store: RootState) => store.favoritesVacancies.total);

  useEffect(() => {
    dispatch(getFavoriteCandidates());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="favorites__page" className="favorites__page">
      <Typography variant="h1">
        Избранное
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '40px' }}>
        <span className="favorites__total">
          {`Показано ${total || 0} ${total % 10 === 1 ? 'кандидат' : [2, 3, 4].includes(total % 10) ? 'кандидата' : 'кандидатов'}`}
        </span>
      </Typography>
      {Object.entries(favoritesList).map(([key, value]) => (
        <Specialty key={key} cards={value} title={key} />
      ))}
    </main>
  );
}

export default Favorites;
