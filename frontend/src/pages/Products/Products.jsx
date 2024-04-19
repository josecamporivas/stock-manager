import { Box, Button, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../utils/queries/products";
import TableProducts from "../../components/TableProducts/TableProducts";
import ModalCreateUpdateProduct from "../../components/ModalCreateUpdateProduct/ModalCreateUpdateProduct";

export default function Products() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [verMasVisibility, setVerMasVisibility] = useState("visible")

    const fetchAllProducts = async () => {
        const data = await getAllProducts()
        if(data.error) {
            //TODO: handle error
            return
        }
        console.log(data)
        setProducts(data)
    }

    const handleVerMas = async () => {
        const data = await getAllProducts({page: page + 1})
        if(data.error) {
            //TODO: handle error
            return
        }
        if(data.length < 10) {
            setVerMasVisibility("hidden")
        }
        setProducts([...products, ...data])
        setPage(page + 1)
    }

    const handleDelete = (productId) => async () => {
        console.log('delete', productId)
        const result = await deleteProduct(productId)
        if(result.error) {
            //TODO: handle error
            return
        }

        const newProducts = products.filter(product => product.product_id !== productId)
        setProducts(newProducts)
    } 

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <>
            <Sidebar />
            <Container maxWidth="md">
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">PRODUCTOS</h1>
                    <ModalCreateUpdateProduct setProducts={setProducts} mode='create' styleContainer={{marginBottom: 10}} />
                </Box>
                <Box sx={{marginBottom: 1}}>
                    <TableProducts products={products} setProducts={setProducts} handleDelete={handleDelete} />
                </Box>
                <Box sx={{textAlign: "center", marginBottom: 3}} visibility={verMasVisibility}>
                    <Button variant="contained" onClick={handleVerMas}>Ver más</Button>
                </Box>
            </Container>
        </>
    )
}