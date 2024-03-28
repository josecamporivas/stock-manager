import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { createUser, updateUser } from "../../utils/queries/user";

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

const userDataDefault = {
    username: '',
    password: '',
    name: '',
    surname: '',
    dni: '',
    email: '',
    role: ''
}

export default function ModalCreateUpdateUser({styleContainer, setUsers, mode, userDataProps = userDataDefault}) {
    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState(userDataProps)
    const [showPassword, setShowPassword] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleInputChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const createUserHandler = async () => {
        const result = await createUser(userData)
        if(result.error) {
            //TODO: handle error
            return
        }

        setUsers(users => [...users, result])
    }

    const updateUserHandler = async () => {
        const result = await updateUser(userData)
        
        if(result.error) {
            //TODO: handle error
            return
        }
 
        setUsers(users => [...users.filter(user => user.user_id !== userData.user_id), result])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (mode === 'create') {
            await createUserHandler()
        }
        
        if (mode === 'update') {
            await updateUserHandler()
        }
    }
    return (
        <div style={styleContainer}>
            {mode === 'create' && <Button onClick={handleOpen} sx={{bgcolor: "#1976d2", '&:hover > *': {color: '#1976d2'}}}><AddIcon sx={{color: '#fff'}} /></Button>}
            {mode === 'update' && <IconButton color='primary' onClick={handleOpen}><EditIcon /></IconButton>}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                <form className="modal-form" onSubmit={handleSubmit}>
                        <TextField size='small' name='username' label="Nombre de usuario" value={userData.username}
                            onChange={handleInputChange}
                        />
                        <FormControl sx={{width: '25ch' }} variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password" >Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Contraseña"
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <TextField size='small' name='name' label="Nombre" value={userData.name}
                            onChange={handleInputChange}
                        />
                        <TextField size='small' name='surname' label="Apellidos" value={userData.surname}
                            onChange={handleInputChange}
                        />
                        <TextField size='small' name='dni' label="DNI" value={userData.dni}
                            onChange={handleInputChange}
                        />
                        <TextField size='small' name='email' label="Email" value={userData.email}
                            onChange={handleInputChange}
                        />
                        <FormControl sx={{ m: 1, minWidth: '25ch' }} size="small">
                            <InputLabel id="select-label-rol">Rol</InputLabel>
                            <Select
                                labelId="select-label-rol"
                                value={userData.role}
                                label="Rol"
                                name="role"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="BUY_MANAGER">GESTOR COMPRAS</MenuItem>
                                <MenuItem value="SELL_MANAGER">GESTOR VENTAS</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" 
                            sx={{backgroundColor: '#0F4C75', color: 'white'}}
                            endIcon={<SendIcon />}>
                            {mode === 'create' ? 'Crear usuario': 'Modificar usuario'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}