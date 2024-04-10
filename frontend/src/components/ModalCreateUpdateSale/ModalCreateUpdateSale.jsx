import { Button, IconButton, Modal, Box } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react';
import { getProductsIdNameCost } from '../../utils/queries/products';
import { getAllClients } from '../../utils/queries/clients';

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
        invoice_id: ''
    },
    products: [{name: '', amount: '', price: ''}]
}

export default function ModalCreateUpdateSale({styleContainer, mode = 'create', saleInfoData = saleInfoDefault}){
    const [open, setOpen] = useState(false)
    const [saleInfo, setSaleInfo] = useState(saleInfoData)
    const [products, setProducts] = useState([])
    const [clients, setClients] = useState([])

    const fetchProductsIdAndName = async () => {
        const data = await getProductsIdNameCost()
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
            setBuyInfo(buyInfoDefault)
        }
    }

    const handleSubmit = (e) => { //TODO: handle submit
        e.preventDefault()
        console.log('submit')
    }

    console.log(saleInfo, products, clients)

    return (
        <div style={styleContainer}>
            {mode === 'create' && <Button onClick={handleOpen} sx={{bgcolor: "#1976d2", '&:hover > *': {color: '#1976d2'}}}><AddIcon sx={{color: '#fff'}} /></Button>}
            {mode === 'update' && <IconButton color='primary' onClick={handleOpen}><EditIcon /></IconButton>}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className='modal-form'>

                    </form>
                </Box>
            </Modal>
        </div>
    )
}