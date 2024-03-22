import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

import { format } from '../../utils/dates/dateFormatter'

function Row({buy, products}) {
  const [open, setOpen] = useState(false);

  const total_cost = products.reduce((acc, product) => acc + product.cost  *product.amount, 0)

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

export default function TableBuys({buys}) {
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
            </TableRow>
            </TableHead>
            <TableBody>
            {buys.map(({buy, products}) => (
                <Row key={buy.buy_id} buy={buy} products={products} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}