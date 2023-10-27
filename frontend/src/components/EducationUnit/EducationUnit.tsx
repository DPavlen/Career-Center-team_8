import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './EducationUnit.scss';

import { RootState } from '../../store/store';

function Education() {
  const candidate = useSelector((state: RootState) => state.candidateInfo.candidateInfo);

  return (
    <section className="tech_info">
      <h3 className="direction">Направление</h3>
      {/* <span>
        {candidate?.profession}
      </span> */}

      <h3>Курс</h3>
      <ul className="courses_list">
        {candidate?.course.map((course) => (
          <li key={uuid()} className="courses">
            <span>{course.name}</span>
          </li>
        ))}
      </ul>

      <h3>Навыки</h3>
      <ul className="hards_chip_list">
        {candidate?.hards.map((hard) => (
          <li key={uuid()} className="hards_chip">
            <span>{hard.name}</span>
          </li>
        ))}
      </ul>

      <h3>Образование</h3>
      <ul className="education__container">
        {candidate?.education.map((education) => (
          <li key={uuid()} className="education">
            <span>{education.name_university}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Education;
