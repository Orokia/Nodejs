const express = require('express');
const { addCharacterToGame } = require('../controllers/gameUserController');

const gameUserRouter = express.Router();

gameUserRouter.post('/game/:id/character', addCharacterToGame);

module.exports = gameUserRouter;