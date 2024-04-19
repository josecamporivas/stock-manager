import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBuy, getAllBuys } from "../../utils/queries/buys";
import TableBuys from "../../components/TableBuys/TableBuys";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalCreateSupplier from "../../components/ModalCreateSupplier/ModalCreateSupplier";
import ModalCreateUpdateBuy from "../../components/ModalCreateUpdateBuy/ModalCreateUpdateBuy";

export default function Buys() {
    const navigate = useNavigate()
    const [buys, setBuys] = useState([])
    const [page, setPage] = useState(1)
    const [verMasVisibility, setVerMasVisibility] = useState("visible")

    const fetchAllBuys = async () => {
        const data = await getAllBuys()
        if(data.error) {
            //TODO: handle error
            return
        }
        setBuys(data)
    }

    const handleVerMas = async () => {
        const data = await getAllBuys({page: page + 1})
        if(data.error) {
            //TODO: handle error
            return
        }
        if(data.length < 10) {
            setVerMasVisibility("hidden")
        }
        setBuys([...buys, ...data])
        setPage(page + 1)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
        }
        
        fetchAllBuys()
    }, [])

    const handleDelete = (buy_id) => async () => {
        const data = await deleteBuy(buy_id)
        if(data.error) {
            //TODO: handle error
            return
        }
        const newBuys = [...buys.filter(buy => buy.buy.buy_id !== buy_id)]
        setBuys(newBuys)
    }

    return (
        <>
            <Sidebar />
            <Container maxWidth="md">
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">COMPRAS</h1>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', columnGap: '5px'}}>
                        <ModalCreateUpdateBuy styleContainer={{marginBottom: 10}} setBuys={setBuys} />
                        <ModalCreateSupplier />
                    </div>
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableBuys buys={buys} setBuys={setBuys} handleDelete={handleDelete} />
                </Box>
                <Box sx={{textAlign: "center", marginBottom: 3}} visibility={verMasVisibility}>
                    <Button variant="contained" onClick={handleVerMas}>Ver más</Button>
                </Box>
            </Container>
        </>
    )
}