import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5A9BFF',
            light: '#ACCCFF',
            dark: '#1D6BF3',
            contrastText: '#1A1B22',
        },
        secondary: {
            main: '#FF0200',
        },
        error: {
            main: '#FF0200',
        },
    },
    typography: {
        fontSize: 24,
    },
})

function VacancyList() {
    const vacancies = [
        ['Frontend разработчик', 'JavaScript, HTML, React.js'],
        ['Backend разработчик', 'Vue.js, Node.js, Webpack'],
        ['Дизайнер', 'JavaScript, HTML, React.js'],
    ]

    return (<>
        <ThemeProvider theme={theme}>
            <Link href='/vacancy'>
                <Button variant="contained">Создать вакансию</Button>
            </Link>
            <Typography fontFamily='YS Display' fontSize='16'>
                <TableContainer >
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
                            {vacancies.map(vacancy => {
                                return (<TableRow>
                                    <TableCell>{vacancy[0]}</TableCell>
                                    <TableCell>{vacancy[1]}</TableCell>
                                </TableRow>)
                            }

                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
        </ThemeProvider>
    </>
    )
}
export default VacancyList;