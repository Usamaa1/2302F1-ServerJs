import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import axios from 'axios';

export function AddProduct() {



    const [prodNameInp, setProdName] = useState('');
    const [prodPriceInp, setProdPrice] = useState('');
    const [prodDescriptionInp, setProdDesc] = useState('');

    let successMessage;

    const addProductHandler = async () => {

        try {
            const { data } = await axios.post('http://localhost:3000/api/addProduct', { prodName: prodNameInp, prodPrice: prodPriceInp, prodDesc: prodDescriptionInp }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)

            successMessage = data
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
        >

            <Typography variant="h2" gutterBottom>
                Add Product
            </Typography>
{successMessage && (
    <Typography variant="h2" gutterBottom>
        {successMessage.message}
    </Typography>
)}
            
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">Product Name</InputLabel>
                <Input id="component-simple" onChange={(e) => setProdName(e.target.value)} defaultValue="Composed TextField" />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">Product Price</InputLabel>
                <Input id="component-simple" onChange={(e) => setProdPrice(e.target.value)} defaultValue="Composed TextField" />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">Product Description</InputLabel>
                <Input id="component-simple" onChange={(e) => setProdDesc(e.target.value)} defaultValue="Composed TextField" />
            </FormControl>
            <Button onClick={addProductHandler} variant="contained">Add Product</Button>


        </Box>
    );
}

