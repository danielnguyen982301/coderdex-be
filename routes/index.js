var express = require("express");
var router = express.Router();
const pokemonRouter = require("./pokemons.api");

/* GET home page. */
router.use("/pokemons", pokemonRouter);

router.use("/images", express.static("pokemon"));

module.exports = router;
