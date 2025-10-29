import express from 'express'
import { addProducts, getProducts } from '../controllers/productController.mjs';
const productRoutes = express.Router();



productRoutes.get('/product',getProducts)
productRoutes.post('/addProduct',addProducts);


export default productRoutes;
