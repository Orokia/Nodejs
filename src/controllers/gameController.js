const Game = require("../models/gameModel");

const createOneGame = async (request, response) => {

  const { title, releaseYear, platform, description} = request.body;

  if(!title || !releaseYear || !platform || !description) {
    return response.status(400).json({
      message: "Tous les champs sont obligatoires",
      error: true
    });
  }

  
  try {
    const newGame = await Game.create({title:title,releaseYear:releaseYear,platform:platform,description:description})

    response.status(201).json({message:"Le personnage a été creé", game:newGame})

  }catch (error) {
  console.error("DETAIL ERROR:", error.errors); // 👈 TRÈS UTILE

  response.status(500).json({
    message: error.message,
    details: error.errors,
    error: true
  });
}
}

const getAllGame = async (request, response) => {
  try {
    const games = await Game.findAll();

    response.json({ message: 'VOici les jeux', results: games });
  } catch (error) {
    response.status(500).json({
      message: 'Impossible de récupérer les jeux',
      error: true,
    });
  }
};
const getOneGameById = async (request, response) => {
  const id = request.params.id;

 

  try {
    const game = await Game.findByPk(id);

    if (!game) {
      response.status(404).json({
        message: "Le jeu avec cet ID n'existe pas",
        error: true,
      });
    }

    response.json({ message: 'Voici votre jeu', result: game });
  } catch (error) {
    response.status(500).json({
      message: 'Erreur serveur',
      error: true,
    });
  }
};


module.exports= {createOneGame, getAllGame, getOneGameById};