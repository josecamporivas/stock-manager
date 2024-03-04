import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "./TableExample.css"

export default function TableExample() {
    const rows = [
        {
            name: "Manzanas",
            price: 10,
            date: "10-6-2024"
        },
        {
            name: "Peras",
            price: 20,
            date: "10-6-2024"
        },
        {
            name: "Plátanos",
            price: 30,
            date: "10-6-2024"
        }
    ]
    return (
        <TableContainer style={{width: 400, height: 140}} component={Paper}>
        <Table size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className="thead-table-example">Productos</TableCell>
                    <TableCell className="thead-table-example" align="right">Precio</TableCell>
                    <TableCell className="thead-table-example" align="right">Fecha de compra</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0,  } }}
                >
                    <TableCell sx={{textAlign: "center"}} component="th" scope="row">{row.name}</TableCell>
                    <TableCell sx={{textAlign: "center"}} align="right">{row.price} €</TableCell>
                    <TableCell sx={{textAlign: "center"}} align="right">{row.date}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}