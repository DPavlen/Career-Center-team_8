import './Favorites.scss';
// import { useEffect, useState } from 'react';
// import React from 'react';
import { Typography } from '@mui/material';
// import Specialty from '../../components/Specialty/Specialty';
// import { mockSpecialties } from '../../utils/mockData';
// import VacancySibtitle from '../../components/VacancySibtitle/VacancySibtitle';

function Favorites() {
/*   const [count, setCount] = useState(0);
  let countFavorites; */
/*   const countAvatars = (): void => {
    countFavorites = document.getElementsByTagName('img').length;
    setCount(countFavorites);
  }; */
  /* useEffect(() => {
    // countFavorites = document.getElementsByTagName('img').length;
    countAvatars();
    // const counts = document.querySelectorAll('.candidate__card');
    // setCount(counts.length);
    // console.log(document.getElementsByTagName('img').length);
  }, []); */

  return (
    <main style={{ padding: '0 0 0 32px' }} id="favorites__page" className="favorites__page">
      <Typography variant="h1">
        Избранное
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '40px' }}>
        <span className="favorites__total">
          {`Показано ${0} кандидатов`}
        </span>
      </Typography>
      {/* {mockSpecialties.map((specialty) => (
        <Specialty key={Math.floor(Math.random() * 999)} title={specialty.label} />
      ))} */}
    </main>
  );
}

export default Favorites;
