import './Filter.scss';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrowDown from '../../assets/icons/arrow_down.svg';
import { RootState } from '../../store/store';
import { selectFilter } from '../../store/selectedFilter/selectedFilter';

export interface IFilterProps {
  text: string;
  children: React.ReactNode;
  withBorder?: boolean;
  panel: string;
}

function Filter({
  text, children, withBorder = true, panel,
}: IFilterProps) {
  const selectedFilter = useSelector((state:RootState) => state.selectedFilter.selectedFilter);
  const dispatch = useDispatch();

  return (
    <Accordion
      expanded={panel === selectedFilter}
      onChange={(_, exp) => dispatch(selectFilter(exp ? panel : null))}
      sx={{
        border: 'none',
        boxShadow: 'none',
        '&.Mui-expanded': { margin: 0, '&:before': { opacity: 1 } },
        '&:before': {
          display: withBorder ? 'inherit' : 'none', left: '24px', right: '24px', height: '0.5px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<img alt="checkbox-field" src={arrowDown} className="filter__icon" />}
        sx={{
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: 'inherit !important',
          '& .MuiAccordionSummary-content': {
            marginTop: '26px',
            marginBottom: '17.5px',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            marginTop: '26px',
            marginBottom: '17.5px',
          },
        }}
      >
        <p className="filter__name">{text}</p>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, paddingBottom: '16px' }}>{children}</AccordionDetails>
    </Accordion>
  );
}

Filter.defaultProps = {
  withBorder: true,
};

export default Filter;
