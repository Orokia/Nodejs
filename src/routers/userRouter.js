const express = require('express');
const {register,deleteUser,signin}= require('../controllers/userController')
const userRouter= express.Router();

userRouter.post('/register', register)

userRouter.post('/:id',signin)
userRouter.delete('/:id',deleteUser)
module.exports= userRouter;