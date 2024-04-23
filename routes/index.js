var express = require("express");
var router = express.Router();
const pokemonRouter = require("./pokemons.api");

/* GET home page. */

router.get("/", (req, res) => {
  res.status(200).send("Just a simple Pokemon API");
});

router.use("/pokemons", pokemonRouter);

router.use("/images", express.static("pokemon"));

module.exports = router;
