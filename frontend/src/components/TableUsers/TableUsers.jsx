import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreateUpdateUser from "../ModalCreateUpdateUser/ModalCreateUpdateUser";

export default function TableUsers({users, handleDelete, setUsers}) {
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
                    <TableCell align="center">Acciones</TableCell>
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
                        <TableCell align="center">
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <ModalCreateUpdateUser userDataProps={user} mode='update' setUsers={setUsers}/>
                                {/* <IconButton color='primary' ><EditIcon /></IconButton> */} {/* TODO: add functionality to update user info */}
                                <IconButton color='error' onClick={handleDelete(user.user_id)}><DeleteIcon /></IconButton>
                            </Box> 
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
