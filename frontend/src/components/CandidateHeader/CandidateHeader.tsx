import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './CandidateHeader.scss';
import { Checkbox } from '@mui/material';
import { useCallback, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import iconBack from '../../assets/icons/ic_back.svg';
import { RootState } from '../../store/store';
import like from '../../assets/icons/Like.svg';
import likeFilled from '../../assets/icons/Like filled.svg';
import { ICandidate, addCandidateToFavorites, removeCandidateFromFavorites } from '../../store/foundCandidates/foundCandidates';
import mainApi from '../../utils/MainApi';
import { addCandidateInfo } from '../../store/candidateInfo/candidateInfo';

function CandidateHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const asyncDispatch = useDispatch<any>();
  const { id } = useParams();
  function goBack() {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/');
    }
  }

  const updateCandidateInfo = useCallback(() => {
    if (Number(id) > 0) {
      mainApi.getCandidateInfo(Number(id))
        .then((data) => {
          dispatch(addCandidateInfo(data as ICandidate));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, id]);
  useEffect(() => {
    updateCandidateInfo();
  }, [dispatch, updateCandidateInfo, id]);
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
      {candidate
        && (
          <>
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
              checked={candidate.is_tracked}
              onChange={(e) => {
                if (e.target.checked) {
                  asyncDispatch(addCandidateToFavorites(Number(id)));
                } else {
                  asyncDispatch(removeCandidateFromFavorites(Number(id)));
                }
                updateCandidateInfo();
              }}
            />
          </>
        )}
    </header>
  );
}

export default CandidateHeader;
