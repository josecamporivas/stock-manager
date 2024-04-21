import { LineChart } from "@mui/x-charts"

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export default function ChartStats({xAxisData, seriesData}) {
    return (
        <LineChart
            xAxis={[{ data: xAxisData, label: "Meses", valueFormatter: (value) => MONTHS[value - 1]}]}
            series={seriesData.map(serie => ({ data: serie.data, label: serie.label, valueFormatter: (value) => `$${value} €`}))}
            colors={["#2E96FF", "#d67d09"]}
            width={700}
            height={400}
        />
    )
}