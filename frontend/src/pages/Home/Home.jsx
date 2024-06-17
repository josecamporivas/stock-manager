import { Box, Button, Container, Stack } from "@mui/material"

import "./Home.css"
import { LineChart } from "@mui/x-charts"
import TableExample from "../../components/TableExample/TableExample"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/login")
    }

    return (
        <>
            <Container maxWidth="md" sx={{marginTop: "50px", marginBottom: "40px"}}>
                <Box sx={{textAlign: "center", height: "35vh"}}>
                    <h1 className="title-home color-primary">STOCK MANAGER</h1>
                    <h2 className="subtitle-home">Herramienta líder para la gestión de stock de PYMES.</h2>
                    <h2 className="question-title-home">
                        ¿Quieres dar un salto de calidad? <br/>
                        Nosotros haremos la gestión de tu empresa más fácil.
                    </h2>
                    <Button variant="contained" sx={{fontSize: "15px", marginTop: "10px"}} onClick={handleClick}>Iniciar sesión</Button>
                </Box>
                <Box sx={{textAlign: "center", marginTop: "130px"}}>
                    <Stack direction="row">
                        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                            <h1 className="title-functionality">Controla tu stock</h1>
                            <h4 className="text-balance">Conoce el stock de tu empresa en tiempo real y controla tus productos</h4>
                        </Box>
                        <TableExample />
                    </Stack>
                </Box>
                <Box sx={{textAlign: "center", marginTop: "0px"}}>
                    <Stack direction="row">
                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {data: [2, 5.5, 2, 8.5, 1.5, 5], label: "Ventas"},
                                {data: [7, 2.5, 4, 5.5, 8.5, 2], label: "Costes"}
                            ]}
                            colors={["#2E96FF", "#BE1623"]}
                            width={500}
                            height={200}
                            slotProps={{legend: { hidden: true }}}
                            />
                        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                            <h1 className="title-functionality">Genera gráficas</h1>
                            <h4 className="text-balance">A partir de los datos de tu empresa genera representaciones increíbles</h4>
                        </Box>
                    </Stack>
                </Box>
            </Container>  
        </>
    )
}