import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { createSupplier } from "../../utils/queries/supplier";

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

export default function ModalCreateSupplier() {
    const [open, setOpen] = useState(false)
    const [supplierInfo, setSupplierInfo] = useState({name: '', phone: ''})

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChange = (e) => {
        setSupplierInfo({...supplierInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await createSupplier(supplierInfo)
        if(data.error) {
            return
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} sx={{bgcolor: "#00DD0066", '&:hover > *': {color: '#1976d2'}}}><PersonAddAltIcon sx={{color: '#444'}} /></Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form className='modal-form' onSubmit={handleSubmit}>
                        <TextField
                            size='small'
                            name='name'
                            label="Nombre"
                            type="text"
                            onChange={handleChange}
                            value={supplierInfo.name}
                        />
                        <TextField
                            size='small'
                            name='phone'
                            label="Teléfono"
                            type="number"
                            onChange={handleChange}
                            value={supplierInfo.phone}
                        />
                        <Button variant="outlined" type='submit'>Crear proveedor</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}