import { Box, Button, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../utils/queries/products";
import TableProducts from "../../components/TableProducts/TableProducts";
import ModalCreateUpdateProduct from "../../components/ModalCreateUpdateProduct/ModalCreateUpdateProduct";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

export default function Products() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [verMasVisibility, setVerMasVisibility] = useState("visible")
    const [snackbarMessage, setSnackbarMessage] = useState({
        message: '',
        severity: '',
        open: false
    })

    const fetchAllProducts = async () => {
        const data = await getAllProducts()
        if(data.error) {
            showSnackbarMessage(data.error, 'error')
            return
        }
        setProducts(data)
    }

    const handleVerMas = async () => {
        const data = await getAllProducts({page: page + 1})
        if(data.error) {
            return
        }
        if(data.length < 10) {
            setVerMasVisibility("hidden")
            showSnackbarMessage('No hay más productos', 'info')

        }
        setProducts([...products, ...data])
        setPage(page + 1)
    }

    const handleDelete = (productId) => async () => {
        const result = await deleteProduct(productId)
        if(result.error) {
            showSnackbarMessage('Error al eliminar el producto', 'error')
            return
        }

        const newProducts = products.filter(product => product.product_id !== productId)
        setProducts(newProducts)
    } 

    useEffect(() => {
        fetchAllProducts()
    }, [])

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
                    <h1 className="title color-primary">PRODUCTOS</h1>
                    <ModalCreateUpdateProduct setProducts={setProducts}
                                                mode='create'
                                                styleContainer={{marginBottom: 10}}
                                                showSnackbarMessage={showSnackbarMessage} />
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableProducts products={products}
                                    setProducts={setProducts}
                                    handleDelete={handleDelete}
                                    showSnackbarMessage={showSnackbarMessage}
                                    />
                </Box>
                <Box sx={{textAlign: "center", marginBottom: 3}} visibility={verMasVisibility}>
                    <Button variant="contained" onClick={handleVerMas}>Ver más</Button>
                </Box>
            </Container>
        </>
    )
}