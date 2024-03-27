import { Box, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableUsers from "../../components/TableUsers/TableUsers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../utils/queries/user";
import ModalCreateUser from "../../components/ModalCreateUser/ModalCreateUser";

export default function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const fetchAllUsers = async () => {
        const data = await getAllUsers()
        if(data.error) {
            //TODO: handle error
            return
        }
        setUsers(data)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
            return
        }

        fetchAllUsers()
    }, [])


    return (
        <>
            <Sidebar />
            <Container maxWidth="md">
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">USUARIOS</h1>
                    <ModalCreateUser styleContainer={{marginBottom: 10}} />
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableUsers users={users} />
                </Box>
            </Container>

        </>
    )
}
