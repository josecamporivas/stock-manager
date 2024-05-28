import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useState } from "react";
import { createProduct, getAllCategories, getAllUnitMeasures, updateProduct } from "../../utils/queries/products";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

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

const productDataDefault = {
    name: '',
    description: '',
    cost: '',
    price: '',
    stock: '',
    unit_limit: '',
    category: {
        category_id: ''
    },
    unit: {
        unit_measure_id: ''
    }
}

export default function ModalCreateUpdateProduct({productDataProps = productDataDefault, mode, setProducts, styleContainer, showSnackbarMessage}) {
    const [open, setOpen] = useState(false)
    const [productData, setProductData] = useState(productDataProps)
    const [unitMeasures, setUnitMeasures] = useState([])
    const [categories, setCategories] = useState([])

    const handleOpen = async () => {
        Promise.all([getAllUnitMeasures(), getAllCategories()]).then(([units, categs]) => {
            if(units.error || categs.error) {
                showSnackbarMessage('Error al cargar los datos','error')
                return
            }
            setOpen(true)
            setUnitMeasures(units)
            setCategories(categs)
        })
    }
    const handleClose = () => setOpen(false)

    const handleInputChange = (e) => {
        if(e.target.name === 'unit_id') {
            setProductData({...productData, unit: {unit_measure_id: e.target.value}})
            return
        }

        if(e.target.name === 'category_id') {
            setProductData({...productData, category: {category_id: e.target.value}})
            return
        }
        setProductData({...productData, [e.target.name]: e.target.value})
    }

    const createProductHandler = async () => {
        const productDataCreate = {...productData, unit_measure_id: productData.unit.unit_measure_id, category_id: productData.category.category_id}
        productDataCreate.unit = undefined

        const result = await createProduct(productDataCreate)
        if(result.error) {
            showSnackbarMessage(result.error,'error')
            return
        }

        setProducts(products => [...products, result])
    }

    const updateProductHandler = async () => {
        const productDataUpdate = {...productData, unit_measure_id: productData.unit.unit_measure_id, category_id: productData.category.category_id}

        const result = await updateProduct(productDataUpdate)
        if(result.error) {
            showSnackbarMessage(result.error,'error')
            return
        }

        setProducts(products => [...products.filter(product => product.product_id !== productData.product_id), result])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(mode === 'create') {
            await createProductHandler()
            showSnackbarMessage('Producto creado','success')
            return
        }

        if(mode === 'update') {
            await updateProductHandler()
            showSnackbarMessage('Producto actualizado','success')
            return
        }
    }

    return (
        <div style={styleContainer}>
            {mode === 'create' && <Button onClick={handleOpen} sx={{bgcolor: "#1976d2", '&:hover > *': {color: '#1976d2'}}}><AddIcon sx={{color: '#fff'}} /></Button>}
            {mode === 'update' && <IconButton color='primary' onClick={handleOpen}><EditIcon /></IconButton>}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <TextField size='small' name='name' label="Nombre del producto" value={productData.name}
                                onChange={handleInputChange}
                            />
                        <TextField size='small' name='description' label="Descripción" value={productData.description}
                                onChange={handleInputChange}
                            />
                        <TextField size='small' name='cost' label="Coste" value={productData.cost}
                                onChange={handleInputChange}
                            />
                        <TextField size='small' name='price' label="Precio" value={productData.price}
                                onChange={handleInputChange}
                            />
                        <TextField size='small' name='stock' label="Existencias" value={productData.stock}
                                onChange={handleInputChange}
                            />
                        <TextField size='small' name='unit_limit' label="Límite de alerta" value={productData.unit_limit}
                                onChange={handleInputChange}
                            />
                        <FormControl sx={{minWidth: '25ch' }} size="small">
                            <InputLabel id="select-label-unit-measures">Unidades</InputLabel>
                            <Select
                                labelId="select-label-unit-measures"
                                value={productData.unit.unit_measure_id}
                                label="Unidades"
                                name="unit_id"
                                onChange={handleInputChange}
                            >
                                {unitMeasures.map((unit) => (
                                    <MenuItem key={unit.unit_measure_id} value={unit.unit_measure_id}>{unit.abbreviation}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: '25ch' }} size="small">
                            <InputLabel id="select-label-categories">Categoría</InputLabel>
                            <Select
                                labelId="select-label-categories"
                                value={productData.category.category_id}
                                label="Categorías"
                                name="category_id"
                                onChange={handleInputChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" 
                            sx={{backgroundColor: '#0F4C75', color: 'white'}}
                            endIcon={<SendIcon />}>
                            {mode === 'create' ? 'Crear producto': 'Modificar producto'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}