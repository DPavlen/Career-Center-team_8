import './VacancySubtitle.scss';
// import { Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
// import Button from '@mui/material/Button';
// import like from '../../assets/icons/Like.svg';
// import likeFilled from '../../assets/icons/Like filled.svg';
import type { RootState } from '../../store/store';

function VacancySibtitle() {
  // const candidates = useSelector((state:RootState) => state.foundCandidates.candidates);
  const total = useSelector((state:RootState) => state.foundCandidates.total);
  // Выбранных кандидатов в store закину чуть позже
  // Добавить проверку на кандидата/кандидатов
  return (
    <div className="vacancy-subtitle">
      <span className="vacancy-subtitle__total">
        Показано
        {' '}
        { total}
        {' '}
        кандидатов
      </span>
      <div className="vacancy-subtitle__selected">
        {/* <span className="vacancy-subtitle__choosen">
          Выбрано
          {' '}
          {candidates.length}
          {' '}
          из
          {' '}
          { total}
        </span> */}
        {/* <Checkbox
          disableRipple
          sx={{
            padding: '6px',
            backgroundColor: 'var(--Blue-BG)',
            height: 'fit-content',
            width: '32px',
            borderRadius: '6px',
          }}
          icon={<img alt="checkbox-field" src={like} />}
          checkedIcon={<img alt="checkbox-field" src={likeFilled} />}
        />
        <Button
          sx={{
            marginLeft: '8px',
            borderRadius: '6px',
            textTransform: 'none',
            backgroundColor: 'var(--Blue)',
            width: 180,
            height: 32,
            color: 'var(--White)',
          }}
          variant="contained"
        >
          Отправить вакансию
        </Button> */}
      </div>
    </div>
  );
}

export default VacancySibtitle;
