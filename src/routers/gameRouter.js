const express = require('express');

const gameRouter =express.Router();

const { createOneGame,getOneGameById, getAllGame } = require("../controllers/gameController");

gameRouter.post("/", createOneGame);
gameRouter.get('/:id',getOneGameById)
gameRouter.get('/',getAllGame)
// gameRouter.patch('/:id',updateOneGamesById)
// gameRouter.delete('/:id',deleteOneGamesById)

module.exports= gameRouter;