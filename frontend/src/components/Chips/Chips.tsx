import { v4 as uuid } from 'uuid';
import { Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { HardSkill } from '../../store/candidateInfo/candidateInfo';
import './Chips.scss';

type TChipsProps = {
  data: HardSkill[];
  listStyle: string;
  itemStyle: string;
  xmark: boolean;
}

const handleDelete = () => null;

function Chips({ ...props }: TChipsProps) {
  const {
    data,
    listStyle,
    itemStyle,
    xmark,
  } = props;

  return (
    <ul className={`${listStyle} chips-list`}>
      {data.map((item) => (
        <li key={uuid()} className={`${itemStyle} chips-item`}>
          {xmark ? (
            <Chip
              label={item.name}
              onDelete={handleDelete}
              deleteIcon={<CloseIcon />}
            />
          ) : (
            <Chip
              label={item.name}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Chips;
