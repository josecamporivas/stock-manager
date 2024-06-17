import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ModalCreateUpdateProduct from "../ModalCreateUpdateProduct/ModalCreateUpdateProduct";

import DeleteIcon from '@mui/icons-material/Delete';

export default function TableProducts({products, setProducts, handleDelete, showSnackbarMessage}) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow sx={{backgroundColor: '#DDD'}}>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Categoría</TableCell>
                    <TableCell align="center">Precio de compra</TableCell>
                    <TableCell align="center">Precio de venta</TableCell>
                    <TableCell align="center">Existencias</TableCell>
                    <TableCell align="center">Límite de alerta</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <TableRow key={product.product_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{product.name}</TableCell>
                        <TableCell align="center">{product.category.category_name}</TableCell>
                        <TableCell align="center">{product.cost} €</TableCell>
                        <TableCell align="center">{product.price} €</TableCell>
                        <TableCell align="center">{product.stock} {product.unit.abbreviation}</TableCell>
                        <TableCell align="center">{product.unit_limit} {product.unit.abbreviation}</TableCell>
                        <TableCell align="center">
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <ModalCreateUpdateProduct productDataProps={product} mode='update' setProducts={setProducts} showSnackbarMessage={showSnackbarMessage}/>
                                <IconButton color='error' onClick={handleDelete(product.product_id)}><DeleteIcon /></IconButton>
                            </Box> 
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}