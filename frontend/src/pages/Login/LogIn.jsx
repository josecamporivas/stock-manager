import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import "./LogIn.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { getToken } from "../../utils/queries/logIn";
import { useNavigate } from "react-router-dom";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

export default function LogIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [snackbarMessage, setSnackbarMessage] = useState({
        message: '',
        severity: '',
        open: false
    })

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleLogIn = async (e) => {
        e.preventDefault()
        const result = await getToken(credentials)
        
        if(result.error) {
            setSnackbarMessage({
                message: result.error,
                severity: 'error',
                open: true
            })
            return
        }
        sessionStorage.setItem('token', result.access_token)
        sessionStorage.setItem('role', result.role_user)
        navigate('/dashboard')
    }

    const handleChangeUsername = (e) => {
        setCredentials({...credentials, username: e.target.value})
    }

    const handleChangePassword = (e) => {
        setCredentials({...credentials, password: e.target.value})
    }

    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway') {
            return
        }
        setSnackbarMessage({...snackbarMessage, open: false})
    }

    return (
        <Container maxWidth="md" sx={{marginTop: "200px"}}>
            <SnackbarMessage open={snackbarMessage.open}
                            handleCloseSnackbar={handleCloseSnackbar}
                            message={snackbarMessage.message}
                            severity={snackbarMessage.severity} />

            <Box sx={{textAlign: "center"}}>
                <h1 className="title color-primary">INICIO SESIÓN</h1>
            </Box>
            <Box sx={{marginX: "auto"}}>
                <form className="form-login">
                    <TextField label="Nombre de usuario" name="username" onChange={handleChangeUsername} />
                    <FormControl sx={{width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            onChange={handleChangePassword}
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
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{fontSize: "15px", marginTop: "10px"}} onClick={handleLogIn}>Iniciar sesión</Button>
                </form>
            </Box>
        </Container>
    )
}