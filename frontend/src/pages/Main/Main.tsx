import './Main.css';
import VacancyList from '../../components/VacancyList/VacancyList';
function Main() {
  return (
    <main>
      <h1 className="title">
        Хакатон Карьерный трекер х Практикум октябрь’23
      </h1>
      <p>Группа №8</p>
      <VacancyList />
    </main>
  );
}

export default Main;
