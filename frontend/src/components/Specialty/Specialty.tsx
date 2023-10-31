import Chip from '@mui/material/Chip';
import { Typography, Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import VacancyCard from '../VacancyCard/VacancyCard';
import { ICandidate } from '../../store/foundCandidates/foundCandidates';

type TSpecialtyProps = {
  title: string,
  cards: ICandidate[]
}

function Specialty({ title, cards }: TSpecialtyProps) {
  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontSize: '1rem', margin: '48px 0 24px 0' }}
      >
        <Chip label={title} />
      </Typography>
      {cards.map((card) => (
        <Box sx={{ width: '804px' }} key={uuid()} className="candidate__card">
          <VacancyCard
            key={Math.floor(Math.random() * 999)}
            card={card}
          />
        </Box>
      ))}
    </>
  );
}

export default Specialty;
