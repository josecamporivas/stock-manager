import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TableUsers({users}) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow sx={{backgroundColor: '#DDD'}}>
                    <TableCell>Usuario</TableCell>
                    <TableCell align="center">DNI</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Apellidos</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Rol</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{user.username}</TableCell>
                        <TableCell align="center">{user.dni}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.surname}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.role}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
