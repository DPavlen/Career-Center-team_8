import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CandidateHeader.scss';
import { Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import iconBack from '../../assets/icons/ic_back.svg';
import { RootState } from '../../store/store';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';

function CandidateHeader() {
  const navigate = useNavigate();

  function goBack() {
    navigate('/');
  }

  const candidate = useSelector((state: RootState) => state.candidateInfo.candidate);

  return (
    <header className="candidate-header">
      <IconButton
        onClick={() => goBack()}
        sx={{
          height: 'fit-content',
          width: '24px',
          marginLeft: '40px',
          position: 'absolute',
          top: 0,
          left: '-135px',
        }}
      >
        <img alt="Иконка вернуться" src={iconBack} />
      </IconButton>
      <h1 className="candidate-header__title">
        <span>{candidate?.last_name}</span>
        {' '}
        <span>{candidate?.first_name}</span>
        {' '}
        <span>{candidate?.middle_name}</span>
      </h1>
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
