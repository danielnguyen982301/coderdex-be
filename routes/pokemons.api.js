const express = require("express");
const getPokemons = require("../controllers/getPokemons");
const getPokemonById = require("../controllers/getPokemonById");
const createPokemon = require("../controllers/createPokemon");
const updatePokemon = require("../controllers/updatePokemon");
const deletePokemon = require("../controllers/deletePokemon");
const {
  createPokemonValidations,
  updatePokemonValidations,
} = require("../validations/pokemonValidations");
const router = express.Router();

router.get("/", getPokemons);

router.get("/:pokemonId", getPokemonById);

router.post("/", createPokemonValidations, createPokemon);

router.put("/:pokemonId", updatePokemonValidations, updatePokemon);

router.delete("/:pokemonId", deletePokemon);

module.exports = router;
