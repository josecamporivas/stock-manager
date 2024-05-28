import { Box, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableUsers from "../../components/TableUsers/TableUsers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../utils/queries/user";
import ModalCreateUpdateUser from "../../components/ModalCreateUpdateUser/ModalCreateUpdateUser";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

export default function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const [snackbarMessage, setSnackbarMessage] = useState({
        message: '',
        severity: '',
        open: false
    })

    const fetchAllUsers = async () => {
        const data = await getAllUsers()
        if(data.error) {
            showSnackbarMessage(data.error, 'error')
            return
        }
        setUsers(data.map(user => ({...user, password: ''})))
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
            return
        }

        fetchAllUsers()
    }, [])

    const handleDelete = (user_id) => async () => {
        const result = await deleteUser(user_id)

        if(result.error) {
            setSnackbarMessage({
                message: result.error,
                severity: 'error',
                open: true
            })
            return
        }

        const newUsers = [...users.filter(user => user.user_id !== user_id)]
        setUsers(newUsers) 
    }

    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway') {
            return
        }
        setSnackbarMessage({...snackbarMessage, open: false})
    }

    const showSnackbarMessage = (message, severity) => {
        setSnackbarMessage({
            message,
            severity,
            open: true
        })
    }

    return (
        <>
            <Sidebar />
            <SnackbarMessage open={snackbarMessage.open}
                            handleCloseSnackbar={handleCloseSnackbar}
                            message={snackbarMessage.message}
                            severity={snackbarMessage.severity} />
            <Container maxWidth="md">
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">USUARIOS</h1>
                    <ModalCreateUpdateUser setUsers={setUsers}
                                            mode='create'
                                            styleContainer={{marginBottom: 10}}
                                            showSnackbarMessage={showSnackbarMessage} />
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableUsers users={users} handleDelete={handleDelete} setUsers={setUsers} showSnackbarMessage={showSnackbarMessage} />
                </Box>
            </Container>
        </>
    )
}
