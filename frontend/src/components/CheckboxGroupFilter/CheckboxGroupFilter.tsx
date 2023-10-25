import './CheckboxGroupFilter.scss';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter, { IFilterProps } from '../Filter/Filter';
import checkboxChecked from '../../assets/icons/checkboxChecked.svg';
import checkbox from '../../assets/icons/checkbox.svg';
import Scrollbar from '../Scrollbar/Scrollbar';
import FilterInput from '../FilterInput/FilterInput';
import { RootState } from '../../store/store';
import { setFilter } from '../../store/vacanciesFilter/vacanciesFilter';

interface IOption {
  id: number;
  value: string;
}

interface ICheckboxFilterProps extends Partial<IFilterProps> {
  data: IOption[];
  filter: keyof RootState['vacanciesFilter'];
  title: string;
  placeholder?: string;
  withSearch?: boolean;
  panel: string;
}

function CheckboxGroupFilter({
  data, withSearch, title, placeholder, panel, filter, ...filterProps
}: ICheckboxFilterProps) {
  const value = useSelector((state: RootState) => state.vacanciesFilter[filter] as string[]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [filtred, setFiltred] = useState<IOption[]>([]);

  // eslint-disable-next-line no-shadow
  const onValueChange = useCallback((checked: number | string, name: string) => {
    console.log(value);
    if (value.some((d) => d === name)) {
      dispatch(setFilter({
        [filter]: value.filter((d) => d !== name),
      }));
      return;
    }

    dispatch(setFilter({
      [filter]: [...value, name],
    }));
  }, [value, dispatch, filter]);

  useEffect(() => {
    setFiltred(data.filter((d) => d.value.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  return (
    <Filter text={title} {...filterProps} panel={panel}>
      { withSearch
        ? <FilterInput placeholder={placeholder} search={search} setSearch={setSearch} />
        : null}
      <Scrollbar maxHeight={withSearch ? '192px' : '240px'}>
        {filtred.map((p) => (
          <FormControlLabel
            key={p.id}
            sx={{ display: 'block', margin: 0 }}
            control={(
              <Checkbox
                checked={value.some((v) => v === p.value)}
                onChange={() => onValueChange(p.id, p.value)}
                icon={<img alt="checkbox-field" src={checkbox} />}
                checkedIcon={<img alt="checkbox-field" src={checkboxChecked} />}
                sx={{
                  padding: 0, width: '24px', height: '24px', margin: '12px 12px 12px 24px',
                }}
              />
                  )}
            label={p.value}
          />
        ))}
      </Scrollbar>
    </Filter>
  );
}

CheckboxGroupFilter.defaultProps = {
  withSearch: false,
  placeholder: '',
};

export default CheckboxGroupFilter;
