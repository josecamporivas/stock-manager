import { Button, IconButton, Modal, Box, Autocomplete, TextField } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react';
import { getProductsIdNameCostPrice } from '../../utils/queries/products';
import { getAllClients } from '../../utils/queries/clients';

import '../ModalCreateUpdateBuy/ModalCreateBuy.css'
import { createSale, updateSale } from '../../utils/queries/sales'

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

const saleInfoDefault = {
    invoice: {
        client_id: ''
    },
    products: [{name: '', amount: '', price: ''}]
}

export default function ModalCreateUpdateSale({styleContainer, mode = 'create', saleInfoData = saleInfoDefault, setSales}){
    const [open, setOpen] = useState(false)
    const [saleInfo, setSaleInfo] = useState(saleInfoData)
    const [products, setProducts] = useState([])
    const [clients, setClients] = useState([])

    const fetchProductsIdAndName = async () => {
        const data = await getProductsIdNameCostPrice()
        if(data.error) {
          console.log(data.error)
          return
        }
        setProducts(data)
    }

    const fetchClients = async () => {
        const data = await getAllClients()
        if(data.error) {
            console.log(data.error)
            return
        }
        setClients(data)
    }

    const handleOpen = () => {
        fetchProductsIdAndName()
        fetchClients()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

        if(mode === 'create') {
            setSaleInfo(saleInfoDefault)
        }
    }

    const addFields = (e) => {
        e.preventDefault()
        setSaleInfo({...saleInfo, products: [...saleInfo.products, {name: '', amount: '', price: ''}]})
    }

    const handleDeleteListProduct = (index) => {
        setSaleInfo({...saleInfo, products: saleInfo.products.filter((_, i) => i !== index)})
    }

    const handleChange = (index, name, value) => {
        if(name === 'client') {
            setSaleInfo({...saleInfo, invoice : {...saleInfo.invoice, client_id: value}})
            return
          }
      
          let data = [...saleInfo.products]
          data[index][name] = value
          setSaleInfo({...saleInfo, products: data})
    }

    const handleSubmitCreate = async (client_id, products) => {
        const result = await createSale({client_id, products})
        if(result.error) {
          //TODO: handle error
          return
        }
    
        setSales((sales) => [result, ...sales])
    }

    const handleSubmitUpdate = async (invoice_id, client_id, products) => {
        const result = await updateSale({invoice_id, client_id, products})
        if(result.error) {
          //TODO: handle error
          return
        }
    
        setSales((sales) => sales.map(sale => {
          if(sale.invoice.invoice_id === invoice_id) {
            return result
          }
          return sale
        }))
      }

    const handleSubmit = (e) => {
        e.preventDefault()

        const products = saleInfo.products.filter(product => product.name && product.amount && product.price).map(product => {
            return {
                product_id: mappedProducts.find(item => item.label === product.name).id ?? null,
                amount: product.amount,
                price: product.price
            }
        })

        if(saleInfo.invoice.client_id === null || products.length === 0) {
            // TODO: handle error: Not all fields are filled
            return 
        }

        if(mode === 'create') {
            handleSubmitCreate(saleInfo.invoice.client_id, products)
            return
        }

        if (mode === 'update') {
            console.log(saleInfo)
            handleSubmitUpdate(saleInfo.invoice.invoice_id, saleInfo.invoice.client_id, products)
            return
        }
    }

    const mappedClients = clients.map(client => {
        return {label: client.name, id: client.client_id}
    })

    const mappedProducts = products.map(product => {
        return {label: product.name, id: product.product_id}
    })
    
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
                            id="client-select"
                            name='client'
                            options={mappedClients}
                            sx={{ width: 250 }}
                            size='small'
                            onChange={(e, value) => handleChange(0, 'client', value.id)}
                            value={mappedClients.find(client => client.id === saleInfo.invoice.client_id) ?? null}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                            />
                        {saleInfo.products.map((product, index) => {
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
                                        handleChange(index, 'price', products.find(product => product.product_id === value.id)?.price)
                                        handleChange(index, 'name', value.label)
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
                                    name='price'
                                    label="Precio unitario"
                                    type="number"
                                    onChange={(e) => handleChange(index, 'price', e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={product.price}
                                />

                                <CloseIcon sx={{color: 'red', '&:hover':{cursor: 'pointer'}, display: mode === 'update' ? 'none': 'block'}}
                                        onClick={() => handleDeleteListProduct(index)} />
                            </div>
                            )
                        })}
                        <Button variant="outlined" onClick={addFields} sx={{display: mode === 'update' ? 'none': 'block'}}>Añadir producto</Button>
                        <Button type="submit" variant="contained" 
                            sx={{backgroundColor: '#0F4C75', color: 'white'}}
                            endIcon={<SendIcon />}>
                            {mode === 'create' && 'Crear venta' || 'Modificar venta'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}