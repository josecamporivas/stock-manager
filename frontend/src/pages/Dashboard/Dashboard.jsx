import { Box, Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
    return (
        <>
            <Sidebar />
            <Container maxWidth="md" sx={{marginTop: "200px"}}>
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">DASHBOARD</h1>
                </Box>
            </Container>
        </>
    )
}