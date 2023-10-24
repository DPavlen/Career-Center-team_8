import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function VacancyList() {
  const vacancies = [
    ['Frontend разработчик', 'JavaScript, HTML, React.js'],
    ['Backend разработчик', 'Vue.js, Node.js, Webpack'],
    ['Дизайнер', 'JavaScript, HTML, React.js'],
  ];

  return (
    <>
      <Button href="/vacancy" variant="contained">Создать вакансию</Button>
      <Typography fontFamily="YS Display" fontSize="16">
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'var(--Blue-Main)' }}>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Скилы</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: 'var(--White)' }}>
              <TableRow>
                <TableCell>Frontend разработчик</TableCell>
                <TableCell>JavaScript, HTML, React.js</TableCell>
              </TableRow>
              {vacancies.map((vacancy) => (
                <TableRow>
                  <TableCell>{vacancy[0]}</TableCell>
                  <TableCell>{vacancy[1]}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
}
export default VacancyList;
