import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getBuysStats } from "../../utils/queries/buys";
import { useEffect, useState } from "react";
import ChartStats from "../../components/ChartStats/ChartStats";
import { getSalesStats } from "../../utils/queries/sales";
import { useNavigate } from "react-router-dom";
import NotificationButton from "../../components/NotificationButton/NotificationButton";

export default function Dashboard() {
    const [buysStats, setBuysStats] = useState([])
    const [salesStats, setSalesStats] = useState([])
    const [statsYear, setStatsYear] = useState(2023)
    const YEARS = [2023, 2024]

    const navigate = useNavigate()

    const fetchStats = async () => {
        const dataBuyStats = await getBuysStats(statsYear)
        const dataSaleStats = await getSalesStats(statsYear)

        if(!dataBuyStats.error){
            setBuysStats(dataBuyStats)
        }

        if(!dataSaleStats.error){
            setSalesStats(dataSaleStats)
        }
    }

    const handleInputChange = (e) => {
        setStatsYear(e.target.value)
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') === null){
            navigate('/login')
        }

        fetch

        fetchStats()
    }, [statsYear])

    const setiesDataToParse = () => {
        const seriesData = []

        if(salesStats.length > 0){
            seriesData.push({
                data: salesStats.map(sale => sale.total_cost_sales),
                label: 'Ventas'
            })
        }

        if(buysStats.length > 0){
            seriesData.push({
                data: buysStats.map(buy => buy.total_cost_buys),
                label: 'Compras'
            })
        }

        return seriesData
    }

    return (
        <>
            <Sidebar />
            <NotificationButton />
            <Container maxWidth="md" sx={{marginTop: "10px"}}>
                <Box sx={{textAlign: "center"}}>
                    <h1 className="title color-primary">DASHBOARD</h1>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <FormControl sx={{minWidth: '25ch' }} size="small">
                        <InputLabel id="select-label-unit-measures">Año</InputLabel>
                        <Select
                            labelId="select-label-unit-measures"
                            value={statsYear}
                            label="Año"
                            name="year"
                            onChange={handleInputChange}
                        >
                            {YEARS.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ChartStats
                        seriesData={setiesDataToParse()} />
                </Box>
            </Container>
        </>
    )
}