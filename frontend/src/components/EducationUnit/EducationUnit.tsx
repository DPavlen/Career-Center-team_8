import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../store/store';
import './EducationUnit.scss';

function Education() {
  const { candidates } = useSelector((state: RootState) => state.foundCandidates);
  const candidate = candidates[0];

  return candidate && (
    <div className="tech_info">
      <h3 className="direction">Направление</h3>
      <span>
        {candidate.profession}
      </span>
      <div className="courses_container">
        <h3>Курс</h3>
        {candidate.courses && candidate.courses.map((course) => (
          <div key={uuid()} className="courses">
            {course}
          </div>
        ))}
      </div>
      <h3>Навыки</h3>
      <div className="tech_stack__container">
        {candidate.tech_stack.map((tech) => (
          <span key={uuid()} className="tech_chip">{tech}</span>
        ))}
      </div>
      <h3 className="education">Образование</h3>
      <div className="education__container">
        <span className="edu">
          {candidate.education}
        </span>
      </div>
    </div>
  );
}

export default Education;
