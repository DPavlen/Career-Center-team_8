import './VacancyInfo.scss';
import Button from '@mui/material/Button';

interface VacancyInfoProps {
  hide: () => void
}

function VacancyInfo({ hide } : VacancyInfoProps) {
  return (
    <section className="vacancy-info">
      <div className="vacancy-info__chips">
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
        <span className="vacancy-info__skills">Без опыта</span>
        <span className="vacancy-info__skills">От 0 до 3 лет</span>
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
        <span className="vacancy-info__skills">Без опыта</span>
        <span className="vacancy-info__skills">От 0 до 3 лет</span>
        <span className="vacancy-info__skills">Дизайн</span>
        <span className="vacancy-info__skills">Продуктовый дизайн</span>
      </div>
      <h3 className="vacancy-info__cash">
        Заработная плата
        <span className="vacancy-info__wages">от 10000 рублей</span>
      </h3>
      <h3 className="vacancy-info__title">Обязанности</h3>
      <ul>
        <li className="vacancy-info__caption">— Разработка дизайна сайтов-лендингов, корпоративных сайтов, интернет магазинов.</li>
      </ul>
      <h3 className="vacancy-info__title">Требования обязательные</h3>
      <ul>
        <li className="vacancy-info__caption">— Figma</li>
        <li className="vacancy-info__caption">— Figma</li>
        <li className="vacancy-info__caption">— Figma</li>
        <li className="vacancy-info__caption">— Figma</li>
      </ul>
      <h3 className="vacancy-info__title">Требования необязательные</h3>
      <ul>
        <li className="vacancy-info__caption">— Работа с векторной графикой (CorelDraw, Adobe Illustrator)</li>
      </ul>
      <h3 className="vacancy-info__title">Условия</h3>
      <ul>
        <li className="vacancy-info__caption">— Удалённый формат работы;</li>
        <li className="vacancy-info__caption">— Проектная работа с возможностью трудоустройства в штат;</li>
        <li className="vacancy-info__caption">— Удалённый формат работы;</li>
        <li className="vacancy-info__caption">— Проектная работа с возможностью трудоустройства в штат;</li>
        <li className="vacancy-info__caption">— Удалённый формат работы;</li>
        <li className="vacancy-info__caption">— Проектная работа с возможностью трудоустройства в штат;</li>
        <li className="vacancy-info__caption">— Удалённый формат работы;</li>
      </ul>
      <h3 className="vacancy-info__title">Этапы отбора</h3>
      <ul>
        <li className="vacancy-info__caption">1. Просмотр резюме</li>
        <li className="vacancy-info__caption">1. Просмотр резюме</li>
        <li className="vacancy-info__caption">1. Просмотр резюме</li>
      </ul>
      <Button
        sx={{
          borderRadius: '6px',
          textTransform: 'none',
          fontSize: '14px',
          color: 'var(--Blue)',
          width: 'fit-content',
          padding: 0,
          marginBottom: '16px',
          marginTop: '16px',
          '&:hover': { backgroundColor: 'white' },
        }}
        onClick={() => hide()}
      >
        Свернуть
      </Button>
    </section>
  );
}

export default VacancyInfo;
