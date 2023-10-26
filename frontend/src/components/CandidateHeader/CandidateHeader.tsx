import './CandidateHeader.scss';
import IconButton from '@mui/material/IconButton';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import iconBack from '../../assets/icons/ic_back.svg';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';

function CandidateHeader() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  const candidate = useSelector((state: RootState) => state.candidateInfo.candidates[0]);

  return (
    <header className="candidate-header">
      <IconButton
        onClick={() => goBack()}
        sx={{
          height: 'fit-content',
          width: '24px',
          marginLeft: '40px',
        }}
      >
        <img alt="Иконка вернуться" src={iconBack} />
      </IconButton>
      <h1 className="candidate-header__title">{candidate.name}</h1>
      <Checkbox
        sx={{
          height: 'fit-content',
          width: '26px',
          padding: 0,
        }}
        icon={<img className="candidate-header__like" alt="checkbox-field" src={like} />}
        checkedIcon={<img className="candidate-header__like" alt="checkbox-field" src={likeFilled} />}
      />
    </header>
  );
}

export default CandidateHeader;
