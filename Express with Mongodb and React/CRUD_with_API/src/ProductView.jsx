import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useEffect } from 'react';

function createData(prodName, prodPrice, prodDesc) {
    return { prodName, prodPrice, prodDesc };
}



let rows = [];


async function getProducts() {
    try {
        const response = await axios.get('http://localhost:3000/api/product');
        console.log(response.data);

        response.data.map((items) => {
            const { prodName, prodPrice, prodDesc } = items
            rows = [createData(prodName, prodPrice, prodDesc)]
        })
        console.log('rows', rows)



    } catch (error) {
        console.error(error);
    }
}

getProducts();

export function ProductView() {


    return (
        <>

            <Typography variant="h2" gutterBottom>
                All Products
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Product Price</TableCell>
                            <TableCell align="right">Product Description</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.prodName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.prodName}
                                </TableCell>
                                <TableCell align="right">{row.prodPrice}</TableCell>
                                <TableCell align="right">{row.prodDesc}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
