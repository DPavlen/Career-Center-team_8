import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import './VacancyForm.css';
import { Checkbox, FormGroup } from '@mui/material';

function VacancyForm() {
  return (
    <div className="vacancies">
      <h1 className="vacancies__title">Поиск кандидатов</h1>
      <FormControl className="vacancy-form">
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Специальность:</label>
          <Autocomplete
            disablePortal
            id="speciality"
            options={['test', 'test2']}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Введите специальность" />}
          />
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Курс Практикума:</label>
          <FormGroup>
            <FormControlLabel control={<Checkbox color="default" />} label="Веб-разработчик" />
            <FormControlLabel control={<Checkbox color="default" />} label="IOS-разработчик" />
            <FormControlLabel control={<Checkbox color="default" />} label="Разработчик C++" />
          </FormGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Ключевые навыки:</label>
          <Stack spacing={3} sx={{ width: 400 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={['test', 'test2', 'test3', 'test4']}
              getOptionLabel={(option) => option}
              defaultValue={['test']}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ключевые навыки"
                  placeholder="Навыки"
                />
              )}
            />
          </Stack>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Опыт работы:</label>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Активный"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Не имеет значения" control={<Radio color="default" />} label="Не имеет значения" />
            <FormControlLabel value="Без опыта" control={<Radio color="default" />} label="Без опыта" />
            <FormControlLabel value="От 1 года до 3-х лет" control={<Radio color="default" />} label="От 1 года до 3-х лет" />
            <FormControlLabel value="От 3 до 6 лет" control={<Radio color="default" />} label="От 3 до 6 лет" />
            <FormControlLabel value="Более 6 лет" control={<Radio color="default" />} label="Более 6 лет" />
          </RadioGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Уровень кандидата:</label>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Middle"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Junior" control={<Radio color="default" />} label="Junior" />
            <FormControlLabel value="Middle" control={<Radio color="default" />} label="Middle" />
            <FormControlLabel value="Senior" control={<Radio color="default" />} label="Senior" />
          </RadioGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Геопозиция:</label>
          <TextField id="outlined-basic" label="Укажите страну" variant="outlined" />
          <TextField id="outlined-basic" label="Укажите город" variant="outlined" />
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Тип занятости:</label>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Полная"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Полная" control={<Radio color="default" />} label="Полная" />
            <FormControlLabel value="Частичная" control={<Radio color="default" />} label="Частичная" />
            <FormControlLabel value="Проектная работа" control={<Radio color="default" />} label="Проектаная работа" />
          </RadioGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">График работы:</label>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Полный день"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Полный день" control={<Radio color="default" />} label="Полный день" />
            <FormControlLabel value="Гибкий график" control={<Radio color="default" />} label="Гибкий график" />
            <FormControlLabel value="Удаленная работа" control={<Radio color="default" />} label="Удаленная работа" />
          </RadioGroup>
        </div>
        <p className="vacancies__subtitle">Дополнительно:</p>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Статус кандидата:</label>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Активный"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Активный" control={<Radio color="default" />} label="Активный" />
            <FormControlLabel value="Временно не ищу" control={<Radio color="default" />} label="Временно не ищу" />
            <FormControlLabel value="Нашел" control={<Radio color="default" />} label="Нашел" />
          </RadioGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Образование:</label>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Высшее" control={<Radio color="default" />} label="Высшее" />
            <FormControlLabel value="Среднее профессиональное" control={<Radio color="default" />} label="Среднее профессиональное" />
          </RadioGroup>
        </div>
        <div className="vacancy-form__container">
          <label className="vacancy-form__label">Оформление:</label>
          <Autocomplete
            disablePortal
            id="speciality"
            options={['Аутстаффинг', 'По договору ГПХ', 'Трудовой договор']}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Выберите способ оформления" />}
          />
        </div>
      </FormControl>
      <div className="vacancy-form__buttons">
        <Button variant="contained" color="success">Подобрать кандидатов</Button>
        <Button variant="contained" color="success">Отклики</Button>
      </div>
    </div>
  );
}

export default VacancyForm;
