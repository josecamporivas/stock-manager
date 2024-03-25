import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import { format } from '../../utils/dates/dateFormatter'

function Row({buy, products, handleDelete}) {
  const [open, setOpen] = useState(false);

  const total_cost = products.reduce((acc, product) => acc + product.cost * product.amount, 0)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align='center'>
          {format(buy.date)}
        </TableCell>
        <TableCell align="center">{products.length}</TableCell>
        <TableCell align="center">{buy.supplier_name}</TableCell>
        <TableCell align="center">{buy.user_name}</TableCell>
        <TableCell align="center">{total_cost} €</TableCell>
        <TableCell align="center">
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <IconButton color='primary' ><EditIcon /></IconButton> {/* TODO: add functionality to update buys info */}
            <IconButton color='error' onClick={handleDelete(buy.buy_id)}><DeleteIcon /></IconButton>
          </Box> 
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{fontWeight: '700'}} > 
                Lineas de compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{backgroundColor: '#EEE'}}>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Coste</TableCell>
                    <TableCell align="right">Coste total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(({product, cost, amount}) => (
                    <TableRow key={product.product_id}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell>{amount} {product.unit_measure_abbreviation}</TableCell>
                      <TableCell align="right">{cost} €/{product.unit_measure_abbreviation}</TableCell>
                      <TableCell align="right">
                        {cost * amount} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TableBuys({buys, handleDelete}) {

    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{backgroundColor: '#DDD'}}>
                  <TableCell />
                  <TableCell sx={{maxWidth: '150px'}} align='center'>Ventas<br/>(orden por fecha)</TableCell>
                  <TableCell align="center">Número de productos</TableCell>
                  <TableCell align="center">Proveedor</TableCell>
                  <TableCell align="center">Gestor de compra</TableCell>
                  <TableCell align="center">Total de compra</TableCell>
                  <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {buys.map(({buy, products}) => (
                <Row key={buy.buy_id} buy={buy} products={products} handleDelete={handleDelete} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}