import { useSelector } from 'react-redux';

import './Experience.scss';

import { RootState } from '../../store/store';

function Experience() {
  const candidate = useSelector((state: RootState) => state.candidateInfo.candidateInfo);

  function createDateString(yearStart: number, yearEnd: number): string {
    if (yearEnd) {
      return `C ${yearStart} по ${yearEnd} год`;
    }

    return `C ${yearStart} по настоящее время`;
  }

  return (
    <section className="experience">
      <h2 className="experience__title">Опыт работы</h2>
      <ul className="experience__list">
        {candidate?.experience_detailed.map((detail) => (
          <li className="experience__detail">
            <h3 className="experience__date">{createDateString(detail.date_start, detail.date_end)}</h3>
            <p className="experience__name">{detail.name}</p>
            <p className="experience__post">{detail.post}</p>
            <p className="experience__responsibilities">{detail.responsibilities}</p>
          </li>
        ))}
      </ul>
      {/* <h2 className="experience__title">Обо мне</h2> */}
      {/* <p className="experience__about-me">
        Привет. Почему же я выбрал эту сферу? Ещё на втором курсе
        бакалавра я понял, что тем, на кого я учусь, быть не хочу.
        И меня заинтересовал графический дизайн. На уровне любителя
        я начал осваивать фотошоп. На третьем курсе учёбы я начал
        брать свои первые заказы, связанные с дизайном, и работаю
        графическим дизайнером по сей день.
      </p> */}
    </section>
  );
}

export default Experience;
