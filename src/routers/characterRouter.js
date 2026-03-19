const express = require('express');
const { createOneCharacter, getOneCharacterById, updateOneCharacterById, deleteOneCharacterById, getAllCharacter } = require('../controllers/characterController');
const characterRouter =express.Router();

characterRouter.post('/',createOneCharacter)
characterRouter.get('/:id',getOneCharacterById)
characterRouter.get('/',getAllCharacter)
characterRouter.patch('/:id',updateOneCharacterById)
characterRouter.delete('/:id',deleteOneCharacterById)
module.exports= characterRouter;