import { useSelector } from 'react-redux';

import './CandidateInfo.scss';

import Button from '@mui/material/Button';

import location from '../../assets/icons/location.svg';
import phone from '../../assets/icons/phone.svg';
import email from '../../assets/icons/email.svg';
import telegram from '../../assets/icons/telegram.svg';
// import avatar from '../../assets/candidatePhoto.png';

import { RootState } from '../../store/store';

function CandidateInfo() {
  const candidate = useSelector((state: RootState) => state.candidateInfo.candidate);
  return (
    <section className="candidate-info">
      <div
        className="candidate-info__avatar"
        style={{
          backgroundImage: `url(${candidate?.image})`,
        }}
      />
      {/* <div
          className="candidate-info__avatar"
          style={{
            backgroundImage: `url(${candidate?.image})`,
          }}
        /> */}
      <div className="candidate-info__container">
        <h2 className="candidate-info__title">{candidate?.specialization}</h2>
        <div className="candidate-info__wrapper">
          <ul>
            <li className="candidate-info__description">
              <span>Уровень</span>
              {candidate
                && candidate.level && <span className="candidate-info__span-accent">{candidate.level}</span>}
            </li>
            <li className="candidate-info__description">
              <span>Опыт</span>
              {candidate
                && candidate.experience && <span className="candidate-info__span-accent">{candidate.experience}</span>}
            </li>
            <li className="candidate-info__description">
              <span>Занятость</span>
              <span className="candidate-info__span-accent">
                {
                  candidate
                  && candidate.employment_type
                  && candidate.employment_type.map((type) => (type.name)).join(', ')
                }
              </span>
            </li>
            <li className="candidate-info__description">
              <span>Тип работы</span>
              <span className="candidate-info__span-accent">
                {
                  candidate
                  && candidate.work_schedule
                  && candidate.work_schedule.map((type) => (type.name)).join(', ')
                }
              </span>
            </li>
          </ul>
          <ul>
            {/* <li className="candidate-info__span-accent">{candidate?.level || null}</li> */}
            {/* <li className="candidate-info__span-accent">{candidate?.experience || null}</li> */}
            {/* <li className="candidate-info__span-accent">
            {candidate?.employment_type?.[0]?.name || null}</li> */}
            {/* <li className="candidate-info__span-accent">
            {candidate?.work_schedule?.[0]?.name || null}</li> */}
          </ul>
          <div>
            <div className="candidate-info__icon-container">
              <img alt="Иконка геопозиции" src={location} className="candidate-info__icon" />
              <span className="candidate-info__span-accent">{candidate?.location}</span>
            </div>
            <div className="candidate-info__icon-container">
              <img alt="Иконка телефона" src={phone} className="candidate-info__icon" />
              <span className="candidate-info__span-accent">{candidate?.contacts_phone}</span>
            </div>
            <div className="candidate-info__icon-container">
              <img alt="Иконка email" src={email} className="candidate-info__icon" />
              <span className="candidate-info__span-accent">{candidate?.contacts_email}</span>
            </div>
            <div className="candidate-info__icon-container">
              <img alt="Иконка telegram" src={telegram} className="candidate-info__icon" />
              <span className="candidate-info__span-accent">{candidate?.contacts_other}</span>
            </div>
          </div>
        </div>
        <Button
          sx={{
            borderRadius: '6px',
            textTransform: 'none',
            backgroundColor: 'var(--Blue)',
            width: 284,
            height: 52,
            fontSize: '16px',
            color: 'var(--White)',
          }}
          variant="contained"
        >
          Скачать резюме
        </Button>
      </div>
    </section>
  );
}

export default CandidateInfo;
