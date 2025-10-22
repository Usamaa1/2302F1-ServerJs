import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user',(req,res)=>{
    res.send({
        name: "Arif",
        age: 45,
        department: "Accounts"
    })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
