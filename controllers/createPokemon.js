const fs = require("fs");
const pokemonTypes = require("../pokemonTypes");
const { validationResult } = require("express-validator");

const createPokemon = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ statusCode: 400, errors: errors.array() });
  }
  try {
    const {
      id,
      name,
      types,
      url,
      description,
      height,
      weight,
      category,
      abilities,
    } = req.body;

    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

    const existingIndex = db.data.findIndex(
      (pokemon) => pokemon.name === name || pokemon.id === parseInt(id)
    );
    if (existingIndex >= 0) {
      const exception = new Error("Pokemon already exists");
      exception.statusCode = 400;
      throw exception;
    }

    const newPokemon = {
      id: parseInt(id),
      name: name,
      description: description || "",
      height: height || "",
      weight: weight || "",
      category: category || "",
      abilities: abilities || "",
      types: types,
      url: url,
    };

    db.data.push(newPokemon);
    db.totalPokemons++;

    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).send({ data: newPokemon });
  } catch (error) {
    next(error);
  }
};

module.exports = createPokemon;
