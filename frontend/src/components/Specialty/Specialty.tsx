// import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { RootState } from '../../store/store';
import VacancyCard from '../VacancyCard/VacancyCard';

type TSpecialtyProps = {
  title: string
}

// function Specialty(props: FC<PropsWithChildren<TSpecialtyProps>>) {
function Specialty(props: TSpecialtyProps) {
  const candidates = useSelector((state: RootState) => state.foundCandidates.candidates);
  const { title } = props;
  const handleClick = () => null;
  return (
    <>
      <Typography
        variant="h3"
      >
        <Chip sx={{ fontSize: 18 }} label={title} onClick={handleClick} />
      </Typography>
      {candidates[0] && <VacancyCard key={candidates[1].id} card={candidates[1]} />}
    </>
  );
}

export default Specialty;
