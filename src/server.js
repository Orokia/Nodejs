require('dotenv').config()
const express = require('express')
const {connectionTodb} = require('./db')
const characterRouter = require('./routers/characterRouter')
const userRouter= require("./routers/userRouter") ;
const gameRouter = require('./routers/gameRouter');
const gameUserRouter = require('./routers/gameUserRouter');

const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
const port = process.env.PORT

connectionTodb()
app.use((req,res,next)=> {
 console.log('je suis un middleware');
 
 next();
})
app.use("/characters",
  (req, res, next) =>{
    console.log("je suis un middlware de route");
    next();
  },
   characterRouter)
app.use("/users", userRouter)
app.use("/games",gameRouter)
app.use('/', gameUserRouter);

app.get(
  '/', 
  (req, res, nex) =>{
    console.log("je suis un middlware de route racine");
    next();
  },
  async (req, res) => {
 
  res.send('Hello World!');
},);

app.get(
  "/protected",
  (req, res, next)=>{
    try {
      const token = req.headers.authorization.split(' ');
    console.log(token);
    const isValid =JsonWebTokenError.verify(token, process.env.JWT_SECRET);

    if (isValid){
      next();
    } else{
      res.status(403).json({
        message: "vous n'etre pas autorisé sur cette route protégée",
        error: true,
        
      });
    }
    
    } catch (error) {
      res.status(403).json({
        message: "vous n'etre pas autorisé sur cette route protégée",
        error: true,
        
      });
    }
  },
  (req, res) =>{
    res.json({message: "je suis protegé non"});
    
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
