import express from 'express'
import { addProducts, deleteProduct, getProducts, updateProuduct } from '../controllers/productController.mjs';
const productRoutes = express.Router();



productRoutes.get('/product',getProducts)
productRoutes.post('/addProduct',addProducts);
productRoutes.put('/updateProduct/:id',updateProuduct);
productRoutes.delete('/deleteProduct/:id',deleteProduct);


export default productRoutes;
