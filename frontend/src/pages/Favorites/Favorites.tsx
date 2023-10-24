import './Favorites.css';
import Specialty from '../../components/Specialty/Specialty';
import { mockSpecialties } from '../../utils/mockData';

function Favorites() {
  // const specialties = ['Программирование', 'Дизайн', 'Анализ данных', 'Маркетинг', 'Менеджмент'];
  return (
    <main style={{ paddingLeft: '32px', margin: '42px 0 16px 0', color: 'black' }}>
      <h1 className="title" style={{ marginBottom: '40px' }}>
        Избранное
      </h1>
      {mockSpecialties.map((specialty) => (
        <Specialty key={specialty.key} title={specialty.label} />
      ))}
    </main>
  );
}

export default Favorites;
