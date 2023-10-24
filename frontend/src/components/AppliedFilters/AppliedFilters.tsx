import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import mockFilters from '../../utils/mockData';

function AppliedFilters() {
  const handleDelete = () => null;

  const [isShow, setIsShow] = React.useState(false);

  const handleShow = () => {
    setIsShow(true);
  };
  const handleHide = () => {
    setIsShow(false);
  };

  return (
    <Box sx={{ position: 'relative', width: 804 }}>
      <Collapse in={isShow} collapsedSize={34}>
        <Stack
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
          direction="row"
          sx={{
            maxWidth: !isShow ? '694px' : '804px',
          }}
        >
          {mockFilters.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              // Иконка слишком большая, попробовать сделать через svg file из assets
              deleteIcon={<ClearIcon />}
              onDelete={handleDelete}
              sx={{
                height: '28px',
                borderRadius: '8px',
                lineHeight: 1.2,
                backgroundColor: '#DDE0E4',
                '&:hover': {
                  backgroundColor: '#EBEDF0',
                },
              }}
            />
          ))}
          {!isShow
            ? (
              <Button
                sx={{
                  textTransform: 'none',
                  height: 28,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                onClick={handleShow}
              >
                Показать всё
              </Button>
            )
            : (
              <Button
                sx={{ textTransform: 'none', height: 28 }}
                onClick={handleHide}
              >
                Скрыть
              </Button>
            )}
        </Stack>
      </Collapse>
    </Box>
  );
}

export default AppliedFilters;
