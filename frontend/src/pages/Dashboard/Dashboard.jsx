import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { LineChart } from "@mui/x-charts";
import { getBuysStats } from "../../utils/queries/buys";
import { useEffect, useState } from "react";
import ChartStats from "../../components/ChartStats/ChartStats";
import { getSalesStats } from "../../utils/queries/sales";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [buysStats, setBuysStats] = useState([])
    const [salesStats, setSalesStats] = useState([])
    const [statsYear, setStatsYear] = useState(2023)
    const YEARS = [2021, 2022, 2023, 2024]

    const navigate = useNavigate()

    const fetchStats = async () => {
        const dataBuyStats = await getBuysStats(statsYear)
        const dataSaleStats = await getSalesStats(statsYear)

        console.log(dataBuyStats, dataSaleStats)

        setBuysStats(dataBuyStats)
        setSalesStats(dataSaleStats)
    }

    const handleInputChange = (e) => {
        setStatsYear(e.target.value)
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') === null){
            navigate('/login')
        } 

        fetchStats()
    }, [statsYear])

    return (
        <>
            <Sidebar />
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
                    <ChartStats xAxisData={buysStats.map(buy => buy.month)}   //TODO: Fix cero value line in the middle of the chart
                        seriesData={[{
                            data: buysStats.map(buy => buy.total_cost_buys),
                            label: 'Compras'
                        }, {
                            data: salesStats.map(sale => sale.total_cost_sales),
                            label: 'Ventas'
                        }]} />
                </Box>
            </Container>
        </>
    )
}