import { Alert, Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentInfoUser, updateUser } from "../../utils/queries/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';

import './Profile.css'

export default function Profile() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        dni: '',
        email: '',
        role: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const fetchUserData = async () => {
        const data = await getCurrentInfoUser()
        if(data.error) {
            //TODO: handle error
            return
        }
        data.password = ''

        console.log(data)
        setUserData(data)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token) {
            navigate('/login')
        }

        fetchUserData()
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    const handleInputChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userData)

        const result = await updateUser(userData)
        if(result.error) {
            //TODO: handle error
            /* for example:
                - username already exists
                - email already exists
                - dni already exists
            */
            return
        }
        result.password = ''
        setUserData(result)
        setSnackbarOpen(true)
    }

    return (
        <>
            <Sidebar />     
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" variant="filled" >
                    Datos actualizados!
                </Alert>
            </Snackbar>
            <Container maxWidth="md">
                <Box sx={{textAlign: "center", marginBottom: '15px'}}>
                    <h1 className="title title-profile color-primary">MI PERFIL</h1>

                    <Button onClick={() => setEditMode(!editMode)} sx={{backgroundColor: '#DDD', '&:hover': {backgroundColor: '#BBB'}}}>
                        <EditIcon />
                    </Button>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <TextField size='small' name='username' label="Nombre de usuario" value={userData.username}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                        <FormControl sx={{width: '25ch' }} variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password" disabled={!editMode} >Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end" disablePointerEvents={!editMode}>
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
                                disabled={!editMode}
                            />
                        </FormControl>
                        <TextField size='small' name='name' label="Nombre" value={userData.name}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                        <TextField size='small' name='surname' label="Apellidos" value={userData.surname}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                        <TextField size='small' name='dni' label="DNI" value={userData.dni}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                        <TextField size='small' name='email' label="Email" value={userData.email}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={!editMode}
                        />
                        <TextField size='small' name='role' label="Rol" value={userData.role}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            disabled={true}
                        />
                        <Button type="submit" variant="contained" 
                            sx={{backgroundColor: '#0F4C75', color: 'white', display: editMode ? 'inline-flex' : 'none'}}
                            endIcon={<SendIcon />}>
                            Guardar cambios
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    )
}