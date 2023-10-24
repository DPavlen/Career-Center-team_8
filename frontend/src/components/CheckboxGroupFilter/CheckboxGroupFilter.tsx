import './CheckboxGroupFilter.scss';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Filter, { IFilterProps } from '../Filter/Filter';
import checkboxChecked from '../../assets/icons/checkboxChecked.svg';
import checkbox from '../../assets/icons/checkbox.svg';
import Scrollbar from '../Scrollbar/Scrollbar';

interface IOption {
  id: number;
  value: string;
}

interface ICheckboxFilterProps extends Partial<IFilterProps> {
  value: number[];
  data: IOption[];
  // eslint-disable-next-line no-unused-vars
  onChange(id: number[]): void;
  title: string;
  withSearch?: boolean;
}

function CheckboxGroupFilter({
  value, data, onChange, withSearch, title, ...filterProps
}: ICheckboxFilterProps) {
  const [search, setSearch] = useState<string>('');
  const [filtred, setFiltred] = useState<IOption[]>([]);

  const onValueChange = useCallback((checked: number) => {
    if (value.some((d) => d === checked)) {
      onChange(value.filter((d) => d !== checked));
      return;
    }

    onChange([...value, checked]);
  }, [value, onChange]);

  useEffect(() => {
    setFiltred(data.filter((d) => d.value.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  return (
    <Filter text={title} {...filterProps}>
      { withSearch ? <input className="checkbox__search" value={search} onChange={(e) => setSearch(e.target.value)} /> : null}
      <Scrollbar maxHeight={ withSearch ? '192px' : '240px'}>
        {filtred.map((p) => (
          <FormControlLabel
            key={p.id}
            sx={{ display: 'block' }}
            control={(
              <Checkbox
                checked={value.some((v) => v === p.id)}
                onChange={() => onValueChange(p.id)}
                icon={<img alt="checkbox-field" src={checkbox} />}
                checkedIcon={<img alt="checkbox-field" src={checkboxChecked} />}
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
};

export default CheckboxGroupFilter;
