import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import { format } from '../../utils/dates/dateFormatter'
import ModalCreateUpdateSale from '../ModalCreateUpdateSale/ModalCreateUpdateSale';

function Row({invoice, lines, setSales, handleDelete, showSnackbarMessage}) {
    const [open, setOpen] = useState(false);
  
    const total_price = lines.reduce((acc, line) => acc + line.price * line.amount, 0)
    
    const saleInfoData = {
      invoice,
      products: lines.map(line => ({name: line.product.name, price: line.price, amount: line.amount}))
    }

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
            {format(invoice.date)}
          </TableCell>
          <TableCell align="center">{lines.length}</TableCell>
          <TableCell align="center">{invoice.client_name}</TableCell>
          <TableCell align="center">{invoice.user_name}</TableCell>
          <TableCell align="center">{total_price} €</TableCell>
          <TableCell align="center">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <ModalCreateUpdateSale mode='update' setSales={setSales} saleInfoData={saleInfoData} showSnackbarMessage={showSnackbarMessage} />
              <IconButton color='error' onClick={handleDelete(invoice.invoice_id)}><DeleteIcon /></IconButton>
            </Box> 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" sx={{fontWeight: '700'}} > 
                  Lineas de venta
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow sx={{backgroundColor: '#EEE'}}>
                      <TableCell>Producto</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Coste total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lines.map(({product, price, amount}) => (
                      <TableRow key={product.product_id}>
                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell>{amount} {product.unit_measure_abbreviation}</TableCell>
                        <TableCell align="right">{price} €/{product.unit_measure_abbreviation}</TableCell>
                        <TableCell align="right">
                          {price * amount} €
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
  
  export default function TableSales({sales, setSales, handleDelete, showSnackbarMessage}) {
  
      return (
          <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
              <TableHead>
                <TableRow sx={{backgroundColor: '#DDD'}}>
                    <TableCell />
                    <TableCell sx={{maxWidth: '150px'}} align='center'>Ventas<br/>(orden por fecha)</TableCell>
                    <TableCell align="center">Número de productos</TableCell>
                    <TableCell align="center">Cliente</TableCell>
                    <TableCell align="center">Gestor de venta</TableCell>
                    <TableCell align="center">Total de venta</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {sales.map(({invoice, lines}) => (
                  <Row key={invoice.invoice_id} invoice={invoice} lines={lines} handleDelete={handleDelete}
                        setSales={setSales}
                        showSnackbarMessage={showSnackbarMessage}  />
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      );
  }