import { Box, Container } from "@mui/material";

export default function Dashboard() {
    return (
        <Container maxWidth="md" sx={{marginTop: "200px"}}>
            <Box sx={{textAlign: "center"}}>
                <h1 className="title-login color-primary">DASHBOARD</h1>
            </Box>
        </Container>
    )
}