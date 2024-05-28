import { Alert, Snackbar } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

export default function SnackbarMessage({handleCloseSnackbar, open, message, severity}){
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity} variant="filled" >
                {message}
            </Alert>
        </Snackbar>
    )
}