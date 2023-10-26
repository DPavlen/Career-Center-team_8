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
      <div className="courses_container">
        <h3>Курс</h3>
        {/* {candidate.courses && candidate.courses.map((course) => (
          <div key={uuid()} className="courses">
            {course}
          </div>
        ))} */}
      </div>
      <h3>Навыки</h3>
      <div className="tech_stack__container">
        {candidate?.hards.map((hard) => (
          <span key={uuid()} className="tech_chip">{hard.name}</span>
        ))}
      </div>
      <h3 className="education">Образование</h3>
      <div className="education__container">
        <span className="edu">
          {candidate?.education[0].name_university}
        </span>
      </div>
    </section>
  );
}

export default Education;
