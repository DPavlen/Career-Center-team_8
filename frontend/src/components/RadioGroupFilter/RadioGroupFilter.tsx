import './RadioGroupFilter.scss';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Filter, { IFilterProps } from '../Filter/Filter';
import radioSelect from '../../assets/icons/radiobuttonSelect.svg';
import radio from '../../assets/icons/radiobutton.svg';
import { RootState } from '../../store/store';
import { setFilter } from '../../store/vacanciesFilter/vacanciesFilter';

interface IOption {
  id: number;
  value: string;
}

interface IRadioFilterProps extends Partial<IFilterProps> {
  data: IOption[];
  panel: string;
  filter: keyof RootState['vacanciesFilter'];
}

function RadioGroupFilter({
  filter, data, panel, ...filterProps
}: IRadioFilterProps) {
  const value = useSelector((state: RootState) => state.vacanciesFilter[filter]);
  const dispatch = useDispatch();

  return (
    <Filter panel={panel} text="Направление" {...filterProps}>
      <RadioGroup
        value={value}
        onChange={(e) => dispatch(setFilter({
          [filter]: e.target.value,
        }))}
      >
        {data.map((option : IOption) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={(
              <Radio
                icon={<img alt="radio-field" src={radio} />}
                checkedIcon={<img alt="radio-field" src={radioSelect} />}
                sx={{ padding: 0, margin: '12px 12px 12px 24px', '&:hover': { backgroundColor: 'white' } }}
              />
              )}
            label={option.value}
            sx={{
              marginLeft: 0,
            }}
          />
        ))}
      </RadioGroup>
    </Filter>
  );
}

export default RadioGroupFilter;
