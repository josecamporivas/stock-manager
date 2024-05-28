import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Button, Container } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { deleteSale, getAllSales } from "../../utils/queries/sales";
import TableSales from "../../components/TableSales/TableSales";
import ModalCreateUpdateSale from "../../components/ModalCreateUpdateSale/ModalCreateUpdateSale";
import ModalCreateClient from "../../components/ModalCreateClient/ModalCreateClient";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

export default function Sales() {
    const [sales, setSales] = useState([])
    const [page, setPage] = useState(1)
    const [verMasVisibility, setVerMasVisibility] = useState("visible")
    const [snackbarMessage, setSnackbarMessage] = useState({
        message: '',
        severity: '',
        open: false
    })

    const navigate = useNavigate()

    const fetchAllSales = async () => {
        const data = await getAllSales()
        if(data.error) {
            showSnackbarMessage(data.error, 'error')
            return
        }
        setSales(data)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
        }

        fetchAllSales()
    }, [])

    const handleVerMas = async () => {
        const data = await getAllSales({page: page + 1})
        if(data.error) {
            showSnackbarMessage(data.error, 'error')
            return
        }
        if(data.length < 10) {
            setVerMasVisibility("hidden")
            showSnackbarMessage('No hay más ventas', 'info')
        }
        setBuys([...sales, ...data])
        setPage(page + 1)
    }

    const handleDelete = (invoice_id) => async () => {
        const data = await deleteSale(invoice_id)
        if(data.error) {
            showSnackbarMessage(data.error, 'error')
            return
        }
        const newSales = [...sales.filter(sale => sale.invoice.invoice_id !== invoice_id)]
        setSales(newSales)
    }

    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway') {
            return
        }
        setSnackbarMessage({...snackbarMessage, open: false})
    }

    const showSnackbarMessage = (message, severity) => {
        setSnackbarMessage({
            message: message,
            severity: severity,
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
                    <h1 className="title color-primary">VENTAS</h1>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center', columnGap: '5px'}}>
                        <ModalCreateUpdateSale styleContainer={{marginBottom: 10}}
                                                setSales={setSales}
                                                showSnackbarMessage={showSnackbarMessage} />
                        <ModalCreateClient />
                    </div>
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableSales sales={sales} setSales={setSales} handleDelete={handleDelete} showSnackbarMessage={showSnackbarMessage} />
                </Box>
                <Box sx={{textAlign: "center", marginBottom: 3}} visibility={verMasVisibility}>
                    <Button variant="contained" onClick={handleVerMas}>Ver más</Button>
                </Box>
            </Container>
        </>
    )
}