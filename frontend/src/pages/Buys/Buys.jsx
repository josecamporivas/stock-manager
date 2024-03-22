import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAllBuys from "../../utils/queries/buys";
import TableBuys from "../../components/TableBuys/TableBuys";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalCreateBuy from "../../components/ModalCreateBuy/ModalCreateBuy";

export default function Buys() {
    const navigate = useNavigate()
    const [buys, setBuys] = useState([])

    const fetchAllBuys = async () => {
        const data = await getAllBuys()
        if(data.error) {
            //TODO: handle error
            return
        }
        console.log(data)
        setBuys(data)
    }


    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
        }
        
        fetchAllBuys()
        return
    }, [])

    return (
        <>
            <Sidebar />
            <Container maxWidth="md">
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title-login color-primary">COMPRAS</h1>
                    <ModalCreateBuy styleContainer={{marginBottom: 10}}/>
                </Box>
                <Box>
                    <TableBuys buys={buys} />
                </Box>

            </Container>
        </>
    )
}