const Character = require("../models/characterModel");


const createOneCharacter = async (request, response) => {

  const {name, description} = request.body;

  if(!name || !description || typeof name !== "string" || typeof description !== "string") {
    return response.status(400).json({message:"Le corps de la requête doit contenir name et description, en string", error:true})
  }

  
  try {
    const newCharacter = await Character.create({name:name,description:description})

    response.status(201).json({message:"Le personnage a été creé", character:newCharacter})

  }catch (error) {
  console.error("DETAIL ERROR:", error.errors); // 👈 TRÈS UTILE

  response.status(500).json({
    message: error.message,
    details: error.errors,
    error: true
  });
}
}


const getAllCharacter = async (request, response) => {

  try {
      const characters = await Character.findAll();

      response.json({message:"Personnages trouvés", results:characters})
  } catch (error) {
      response.status(500).json({message:"Erreur coté server", error:true})

  }
}

const getOneCharacterById  = async (request, response) => {
  const id = Number(request.params.id);

  if(!id || isNaN(id)) {
        return response.status(400).json({message:"id doit être de type numérique", error:true})
  }


  try {
    const character = await Character.findByPk(id)

    if(!character) {
      return response.status(404).json({message: "Il n'y a pas de personnage avec cet ID", error:true})
    }

    response.json({message:"Personnage trouvé", result:character})
  } catch (error) {
    response.status(500).json({message:"Erreur du server", error:true})
  }
}

const updateOneCharacterById = async (request, response) => {

    const id = Number(request.params.id);

    if(!id || isNaN(id)) {
          return response.status(400).json({message:"L'id doit être de type numérique", error:true})
    }

    const {description} = request.body;
    try {
      const character = await Character.findByPk(id)

      if(!character) {
        return response.status(404).json({message: "Il n'y a pas de personnage avec cet ID", error:true})
      }
      
      character.description= description;
      character.save();
      
      response.status(201).json({message:"Personnage modifié avec succès", result: character})
      } catch (error) {
        console.log(error)
        response.status(500).json({message:"Erreur du server", error:true})
      }
}

const deleteOneCharacterById = async (request, response) => {
 const id = Number(request.params.id);

  if(!id || isNaN(id)) {
        return response.status(400).json({message:"L'id doit être de type numérique", error:true})
  }


  try {
    const character = await Character.findByPk(id)

    if(!character) {
      return response.status(404).json({message: "Il n'y a pas de personnage avec cet ID", error:true})
    }

    const isDestroyed = await character.destroy()
    response.json({message:"Personnage supprimé", result:isDestroyed})
  } catch (error) {
    response.status(500).json({message:"Erreur du server", error:true})
  }
}

module.exports = {createOneCharacter, getAllCharacter, getOneCharacterById, updateOneCharacterById, deleteOneCharacterById}