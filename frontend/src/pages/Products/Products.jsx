import { Box, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/queries/products";
import TableProducts from "../../components/TableProducts/TableProducts";
import ModalCreateUpdateProduct from "../../components/ModalCreateUpdateProduct/ModalCreateUpdateProduct";

export default function Products() {
    const [products, setProducts] = useState([])

    const fetchAllProducts = async () => {
        const data = await getAllProducts()
        if(data.error) {
            //TODO: handle error
            return
        }
        console.log(data)
        setProducts(data)
    }

    const handleDelete = (productId) => () => {  //TODO: manage delete
        console.log('delete', productId)
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
            </Container>
        </>
    )
}