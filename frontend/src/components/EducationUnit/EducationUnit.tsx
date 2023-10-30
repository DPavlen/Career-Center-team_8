import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './EducationUnit.scss';
import { RootState } from '../../store/store';
import Chips from '../Chips/Chips';

function Education() {
  const candidate = useSelector((state: RootState) => state.candidateInfo.candidate);

  return (
    <section className="tech_info">
      <div>

        <h3 className="direction">Направление</h3>
        <span>
          {candidate?.specialization}
        </span>
      </div>
      <div className="courses_container">

        <h3 className="courses_title">Курс</h3>

        <ul className="courses_list">
          {candidate
            && candidate.course
            && candidate.course.map((course) => (
              <li key={uuid()} className="courses">
                <span>{course.name}</span>
              </li>
            ))}
        </ul>

      </div>
      <div className="hards_container">
        <h3>Навыки</h3>
        {candidate
          && candidate.hards
          && (
            <Chips
              data={candidate.hards}
              listStyle="hards_chip_list"
              itemStyle="hards_chip"
              xmark={false}
            />
          )}

      </div>
      <h3>Образование</h3>
      <ul className="education__container">
        {candidate
          && candidate.education
          && candidate.education.map((education) => (
            <li key={uuid()} className="education">
              <span>{education.name_university}</span>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Education;
