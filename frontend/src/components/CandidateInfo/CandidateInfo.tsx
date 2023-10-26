import './CandidateInfo.scss';
import Button from '@mui/material/Button';
import avatar from '../../assets/candidatePhoto.png';
import location from '../../assets/icons/location.svg';
import phone from '../../assets/icons/phone.svg';
import email from '../../assets/icons/email.svg';
import telegram from '../../assets/icons/telegram.svg';
import CandidateHeader from '../CandidateHeader/CandidateHeader';

function CandidateInfo() {
  return (
    <>
      <CandidateHeader />
      <section className="candidate-info">
        <div
          className="candidate-info__avatar"
          style={{
            backgroundImage: `url(${avatar})`,
          }}
        />
        <div className="candidate-info__container">
          <h2 className="candidate-info__title">Дизайнер интерфейсов</h2>
          <div className="candidate-info__wrapper">
            <div>
              <p className="candidate-info__description">
                Уровень
              </p>
              <p className="candidate-info__description">
                Опыт
              </p>
              <p className="candidate-info__description">
                Занятость
              </p>
              <p className="candidate-info__description">
                Тип работы
              </p>
            </div>
            <div>
              <p className="candidate-info__span-accent">Junior</p>
              <p className="candidate-info__span-accent">2 года</p>
              <p className="candidate-info__span-accent">Полная</p>
              <p className="candidate-info__span-accent">Офис, гибрид, удаленная</p>
            </div>
            <div>
              <div className="candidate-info__icon-container">
                <img alt="Иконка геопозиции" src={location} className="candidate-info__icon" />
                <span className="candidate-info__span-accent">Москва</span>
              </div>
              <div className="candidate-info__icon-container">
                <img alt="Иконка телефона" src={phone} className="candidate-info__icon" />
                <span className="candidate-info__span-accent">+7 (910) 105-44-75</span>
              </div>
              <div className="candidate-info__icon-container">
                <img alt="Иконка email" src={email} className="candidate-info__icon" />
                <span className="candidate-info__span-accent">ivanovpetrovsi@yandex.ru</span>
              </div>
              <div className="candidate-info__icon-container">
                <img alt="Иконка telegram" src={telegram} className="candidate-info__icon" />
                <span className="candidate-info__span-accent">@IvanovIvan</span>
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
    </>
  );
}

export default CandidateInfo;
