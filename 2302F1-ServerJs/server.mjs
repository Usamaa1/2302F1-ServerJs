import express from 'express'
import path from 'path'
import { UserRoute } from './routes/UserRoutes.mjs'

const app = express()
const port = 3000

app.use(express.json())


let __dirname = path.resolve();

// console.log(__dirname)

// \downloads\first/hello\1.jpg

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'./static/index.html'))
// })

// app.get('/cities',(req,res)=>{
//     res.json([
//         {city: "Karachi"},{city:"Lahore"}
//     ])
// })

// app.get('/error',(req,res)=>{
//     res.sendStatus(401) //Unauthorized
// })

// app.get('/status',(req,res)=>{
//     res.status(500).send({message: "Forbidden"});
// })

// app.get('/redirect',(req,res)=>{
//     res.redirect('https://google.com')
// })

// app.get('/download',(req,res)=>{
//     res.download('./download/Postman-win64-Setup.exe')
// })

// app.get('/sendFile',(req,res)=>{
//     let absolutePath = path.join(__dirname,'/download/first.jpg')
//     res.sendFile(absolutePath)
// })



// app.post('/employee/:userId',(req,res)=>{

//     // let id = req.params.userId;
//     let {userId} = req.params;

//     res.send({
//         id: userId,
//         message: "Params Request successfull!"
//     })
// })


// app.post('/users',(req,res)=>{

//    let id =  req.query.userId;


//     res.send({
//         id: id,
//         message: "Query Parameter Request successfull!"
//     })
// })


// app.post('/toys',(req,res)=>{


//     // let toyName = req.body.toyName;
//     // let toyYear = req.body.toyYear;

//     let {toyName, toyYear,toyManufacturer, toyType} = req.body;

//     res.send({
//         data: {
//             toyName, toyYear,toyManufacturer, toyType
//         },
//         message: "Body Request successfull!"
//     })

// })




app.use('/api/v1',UserRoute)









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
