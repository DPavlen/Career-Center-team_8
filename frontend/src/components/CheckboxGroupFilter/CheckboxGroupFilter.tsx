import './CheckboxGroupFilter.scss';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Filter, { IFilterProps } from '../Filter/Filter';
import checkboxChecked from '../../assets/icons/checkboxChecked.svg';
import checkbox from '../../assets/icons/checkbox.svg';
import Scrollbar from '../Scrollbar/Scrollbar';
import FilterInput from '../FilterInput/FilterInput';
import { IFilter } from '../../store/filter';

interface IOption {
  id: number;
  value: string;
}

interface ICheckboxFilterProps extends Partial<IFilterProps> {
  data: IOption[];
  filter: keyof IFilter;
  filterValue: IFilter;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
  title: string;
  placeholder?: string;
  withSearch?: boolean;
}

function CheckboxGroupFilter({
  data, withSearch, title, placeholder, filter, filterValue, onSetFilter, ...filterProps
}: ICheckboxFilterProps) {
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    setValue(filterValue[filter] as string[]);
  }, [filter, filterValue]);
  const [search, setSearch] = useState<string>('');
  const [filtred, setFiltred] = useState<IOption[]>([]);

  // eslint-disable-next-line no-shadow
  const onValueChange = useCallback((name: string) => {
    if (value.some((d) => d === name)) {
      onSetFilter({
        [filter]: value.filter((d) => d !== name),
      });
      return;
    }

    onSetFilter({
      [filter]: [...value, name],
    });
  }, [value, onSetFilter, filter]);

  useEffect(() => {
    setFiltred(data.filter((d) => d.value.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  return (
    <Filter text={title} {...filterProps} filter={filter}>
      { withSearch
        ? <FilterInput placeholder={placeholder} search={search} setSearch={setSearch} />
        : null}
      <Scrollbar maxHeight={withSearch ? '192px' : '240px'}>
        {filtred.map((p) => (
          <FormControlLabel
            key={p.id}
            sx={{
              display: 'block',
              margin: 0,
              '& .MuiFormControlLabel-label': { fontSize: '16px' },
            }}
            control={(
              <Checkbox
                checked={value.some((v) => v === p.value)}
                onChange={() => onValueChange(p.value)}
                icon={<img alt="checkbox-field" src={checkbox} className="checkbox-image" />}
                checkedIcon={<img alt="checkbox-field" className="checkbox-image" src={checkboxChecked} />}
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
