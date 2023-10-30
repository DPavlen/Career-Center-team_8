import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import { Typography, Box } from '@mui/material';
import { RootState } from '../../store/store';
import VacancyCard from '../VacancyCard/VacancyCard';
import { ICandidate } from '../../store/foundCandidates/foundCandidates';

type TSpecialtyProps = {
  title: string
}

function Specialty(props: TSpecialtyProps) {
  const quantity = Math.ceil(Math.random() * 4);
  const candidates = useSelector((state: RootState) => state.foundCandidates.candidates);
  const { title } = props;
  const handleClick = () => null;
  const resultCards: Array<ICandidate> = [];
  for (let i = 0; i < quantity; i += 1) {
    let randomIndex = 0;
    randomIndex = Math.ceil(Math.random() * 10);
    resultCards.push(candidates.find((candidate: ICandidate) => candidate.id === randomIndex)!);
  }
  return (
    <>
      <Typography
        variant="h3"
        sx={{ margin: '60px 0 24px 0' }}
      >
        <Chip label={title} onClick={handleClick} />
      </Typography>
      {resultCards[0] && resultCards!.map((candidate) => (
        <Box sx={{ width: '804px' }} key={Math.floor(Math.random() * 999)} className="candidate__card">
          <VacancyCard
            // key={Math.floor(Math.random() * 999)}
            card={candidate}
            liked
          />
        </Box>
      ))}
    </>
  );
}

export default Specialty;
