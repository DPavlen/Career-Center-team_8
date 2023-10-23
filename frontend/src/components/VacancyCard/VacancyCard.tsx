import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import download from '../../assets/icons/download.svg';
import eye from '../../assets/icons/eye.svg';
import like from '../../assets/icons/Like.svg';
import './VacancyCard.scss';
import { ICandidate } from '../../store/candidates/candidates';

interface VacancyCardProps {
  card : ICandidate;
}

function VacancyCard({ card } : VacancyCardProps) {
  return (
    <Card className="card" sx={{ maxWidth: 1200 }}>
      <div className="card__info">
        <div>
          <h2 className="card__profession">{card.profession}</h2>
          <div className="card__candidate-info">
            <p className="card__candidate-name">{card.name}</p>
            <p className="card__city">{card.city}</p>
          </div>
        </div>
        <Avatar alt="Аватар пользователя" src={card.photo} sx={{ width: 180, height: 180 }} aria-label="recipe" />
      </div>
      <p className="card__level">{card.level}</p>
      <p className="card__experience">
        Опыт работы:
        {' '}
        {card.experience}
        {' '}
        года/лет
      </p>
      <div className="card__interaction">
        <Stack spacing={30} direction="row">
          <Button size="large" variant="contained">Отправить приглашение</Button>
          <Button size="large" variant="outlined">Показать контакты</Button>
        </Stack>
        <div>
          <IconButton color="primary">
            <img alt="Скачать резюме" src={download} />
          </IconButton>
          <IconButton color="primary">
            <img alt="Посмотреть резюме" src={eye} />
          </IconButton>
          <IconButton color="primary">
            <img alt="Добавить в избранное" src={like} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

export default VacancyCard;
