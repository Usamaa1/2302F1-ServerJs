import express from 'express'
import productRoutes from './routes/productRoutes.mjs'
import { run } from './connection/connection.mjs'
import cors from 'cors';
const app = express()
const port = 3000

app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',productRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
