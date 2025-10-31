import express from 'express'
import { addProducts, getProducts, updateProuduct } from '../controllers/productController.mjs';
const productRoutes = express.Router();



productRoutes.get('/product',getProducts)
productRoutes.post('/addProduct',addProducts);
productRoutes.get('/updateProduct/:id',updateProuduct);


export default productRoutes;
