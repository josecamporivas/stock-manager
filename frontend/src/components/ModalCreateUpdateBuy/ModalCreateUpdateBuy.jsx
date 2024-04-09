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
import { createBuy, updateBuy } from '../../utils/queries/buys';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

const buyInfoDefault = {
  buy: {
    supplier_id: '',
  },
  products: [{name: '', amount: '', cost: ''}]
}

export default function ModalCreateUpdateBuy({styleContainer, buyInfoData = buyInfoDefault, setBuys, mode = 'create'}) {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [buyInfo, setBuyInfo] = useState(buyInfoData)
  
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

  const handleOpen = () => {
    fetchAllSuppliers()
    fetchProductsIdAndName()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)

    if(mode === 'create') {
      setBuyInfo(buyInfoDefault)
    }
  }

  const mappedSuppliers = suppliers.map(supplier => {
    return {label: supplier.name, id: supplier.supplier_id}
  })

  const mappedProducts = products.map(product => {
    return {label: product.name, id: product.product_id}
  })

  const handleChange = (index, name, value) => {
    if(name === 'supplier') {
      setBuyInfo({...buyInfo, buy : {...buyInfo.buy, supplier_id: value}})
      return
    }

    let data = [...buyInfo.products]
    data[index][name] = value
    setBuyInfo({...buyInfo, products: data})
  }

  const handleDeleteListProduct = (index) => {
    setBuyInfo({...buyInfo, products: buyInfo.products.filter((_, i) => i !== index)})
  }

  const handleSubmitUpdate = async (buy_id, supplier_id, products) => {
    const result = await updateBuy({buy_id, supplier_id, listProducts: products})
    if(result.error) {
      //TODO: handle error
      return
    }

    setBuys((buys) => buys.map(buy => {
      if(buy.buy.buy_id === buy_id) {
        return result
      }
      return buy
    }))
  }

  const handleSubmitCreate = async (supplier_id, products) => {
    const result = await createBuy({supplier_id, listProducts: products})
    if(result.error) {
      //TODO: handle error
      return
    }

    setBuys((buys) => [result, ...buys])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const products = buyInfo.products.filter(product => product.name && product.amount && product.cost).map(product => {
      return {
        product_id: mappedProducts.find(item => item.label === product.name).id ?? null,
        amount: product.amount,
        cost: product.cost
      }
    })

    if(buyInfo.buy.supplier_id === null || products.length === 0) {
      // TODO: handle error: Not all fields are filled
    }

    if(mode === 'create') {
      handleSubmitCreate(buyInfo.buy.supplier_id, products)
      return
    }

    if (mode === 'update') {
      handleSubmitUpdate(buyInfo.buy.buy_id, buyInfo.buy.supplier_id, products)
      return
    }
    
    /* 
    const result = await createBuy({supplier_id, listProducts: products})
    if(result.error) {
      //TODO: handle error
      return
    }

    setBuys((buys) => [result, ...buys]) */
  }

  const addFields = (e) => {
    e.preventDefault()
    setBuyInfo({...buyInfo, products: [...buyInfo.products, {name: '', amount: '', cost: ''}]})
  }

  return (
    <div style={styleContainer}>
      {mode === 'create' && <Button onClick={handleOpen} sx={{bgcolor: "#1976d2", '&:hover > *': {color: '#1976d2'}}}><AddIcon sx={{color: '#fff'}} /></Button>}
      {mode === 'update' && <IconButton color='primary' onClick={handleOpen}><EditIcon /></IconButton>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit} className='modal-form'>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disablePortal
              id="supplier-select"
              name='supplier'
              options={mappedSuppliers}
              sx={{ width: 250 }}
              size='small'
              onChange={(e, value) => handleChange(0, 'supplier', value.id)}
              value={mappedSuppliers.find(supplier => supplier.id === buyInfo.buy.supplier_id) ?? null}
              renderInput={(params) => <TextField {...params} label="Proveedor" />}
            />

            {buyInfo.products.map((product, index) => {
                return (
                  <div key={index} className='row-products-create-buy'>
                      <Autocomplete
                        size='small'
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        disablePortal
                        options={mappedProducts}
                        sx={{ width: 300 }}
                        value={mappedProducts.find(prod => prod.label === product.name) ?? null}
                        onChange={(e, value, reason) => {
                          if(reason === "selectOption"){
                            handleChange(index, 'cost', products.find(product => product.product_id === value.id)?.cost)
                            handleChange(index, 'name', value.label)
                            e.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.querySelector('input').label
                          }
                        }}
                        renderInput={(params) => <TextField {...params} name='name' label="Producto" />}
                        disabled={mode === 'update'}
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

                      <CloseIcon sx={{color: 'red', '&:hover':{cursor: 'pointer'}, display: mode === 'update' ? 'none': 'block'}}
                              onClick={() => handleDeleteListProduct(index)} />
                  </div>
                )
            })}
            <Button variant="outlined" onClick={addFields}>Añadir producto</Button>
            <Button type="submit" variant="contained" 
              sx={{backgroundColor: '#0F4C75', color: 'white'}}
              endIcon={<SendIcon />}>
              {mode === 'create' && 'Crear compra' || 'Modificar compra'}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
