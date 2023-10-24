import './Filter.scss';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import * as React from 'react';
import arrowDown from '../../assets/icons/arrow_down.svg';

export interface IFilterProps {
  text: string;
  children: React.ReactNode;
  withBorder?: boolean;
  defaultExpanded?: boolean;
}

function Filter({
  text, children, withBorder = true, defaultExpanded = false,
}: IFilterProps) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        border: 'none',
        boxShadow: 'none',
        '&.Mui-expanded': { margin: 0, '&:before': { opacity: 1 } },
        '&:before': { display: withBorder ? 'inherit' : 'none', left: '24px', right: '24px' },
      }}
    >
      <AccordionSummary
        expandIcon={<img alt="checkbox-field" src={arrowDown} />}
        sx={{
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: 'inherit !important',
          '& .MuiAccordionSummary-content': {
            marginTop: '25px',
            marginBottom: '16px',
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
  defaultExpanded: false,
};

export default Filter;
