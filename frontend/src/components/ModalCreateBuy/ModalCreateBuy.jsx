import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllSuppliers } from '../../utils/queries/supplier';
import { getProductsIdNameCost } from '../../utils/queries/products';

import './ModalCreateBuy.css'
import { createBuy } from '../../utils/queries/buys';

import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalCreateBuy({styleContainer, setBuys}) {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [listProducts, setListProducts] = useState([{name: '', amount: '', cost: ''}])
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAllSuppliers = async () => {
    const data = await getAllSuppliers()
    if(data.error) {
      console.log(data.error)
      return
    }
    setSuppliers(data)
  }

  const fetchProductsIdAndName = async () => {
    const data = await getProductsIdNameCost()
    if(data.error) {
      console.log(data.error)
      return
    }
    setProducts(data)
  }

  useEffect(() => {
    fetchAllSuppliers()
    fetchProductsIdAndName()
  }, [])

  const mappedSuppliers = suppliers.map(supplier => {
    return {label: supplier.name, id: supplier.supplier_id}
  })

  const mappedProducts = products.map(product => {
    return {label: product.name, id: product.product_id}
  })

  const handleChange = (index, name, value) => {
    let data = [...listProducts]
    data[index][name] = value
    setListProducts(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const supplier_id =  suppliers.find(sup => sup.name === e.target[0].value)?.supplier_id ?? null
    const products = listProducts.filter(product => product.name && product.amount && product.cost).map(product => {
      return {
        product_id: mappedProducts.find(item => item.label === product.name).id ?? null,
        amount: product.amount,
        cost: product.cost
      }
    })

    if(supplier_id === null || products.length === 0) {
      // TODO: handle error: Not all fields are filled
    }
    console.log(supplier_id, products)
    const result = await createBuy({supplier_id, listProducts: products})
    if(result.error) {
      //TODO: handle error
      return
    }

    setBuys((buys) => [result, ...buys])
  }

  const addFields = (e) => {
    e.preventDefault()
    setListProducts([...listProducts, {name: '', amount: '', cost: ''}])
  }

  return (
    <div style={styleContainer}>
      <Button onClick={handleOpen} sx={{bgcolor: "#1976d2", '&:hover > *': {color: '#1976d2'}}}><AddIcon sx={{color: '#fff'}} /></Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit} className='create-buy-form'>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disablePortal
              id="supplier-select"
              name='supplier'
              options={mappedSuppliers}
              sx={{ width: 250 }}
              size='small'
              renderInput={(params) => <TextField {...params} label="Proveedor" />}
            />

            {listProducts.map((product, index) => {
                return (
                  <div key={index} className='row-products-create-buy'>
                      <Autocomplete
                        size='small'
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        disablePortal
                        options={mappedProducts}
                        sx={{ width: 300 }}
                        onChange={(e, value, reason) => {
                          if(reason === "selectOption"){
                            handleChange(index, 'cost', products.find(product => product.product_id === value.id)?.cost)
                            handleChange(index, 'name', value.label)
                            e.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.querySelector('input').label
                          }
                        }}
                        renderInput={(params) => <TextField {...params} name='name' label="Producto" value={product.name} />}
                      />
                      <TextField
                        size='small'
                        name='amount'
                        label="Cantidad"
                        type="number"
                        onChange={(e) => handleChange(index, 'amount', e.target.value)}
                        value={product.amount}
                      />

                      <TextField
                        size='small'
                        name='cost'
                        label="Coste unitario"
                        type="number"
                        onChange={(e) => handleChange(index, 'cost', e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={product.cost}
                      />

                      <CloseIcon sx={{color: 'red', '&:hover':{cursor: 'pointer'}}} onClick={() => setListProducts(listProducts.filter((_, i) => i !== index))}/>
                  </div>
                )
            })}
            <Button variant="outlined" onClick={addFields}>Añadir producto</Button>
            <Button variant="outlined" type='submit'>Crear compra</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
