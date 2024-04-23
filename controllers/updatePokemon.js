const fs = require("fs");
const pokemonTypes = require("../pokemonTypes");
const { validationResult } = require("express-validator");

const updatePokemon = (req, res, next) => {
  const allowedUpdate = [
    "id",
    "name",
    "description",
    "height",
    "weight",
    "category",
    "abilities",
    "types",
    "url",
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ statusCode: 400, errors: errors.array() });
  }
  try {
    const { pokemonId } = req.params;
    const updates = req.body;
    const updateKeys = Object.keys(updates);
    const invalidFields = updateKeys.filter(
      (field) => !allowedUpdate.includes(field)
    );

    if (invalidFields.length) {
      const exception = new Error("Invalid update field");
      exception.statusCode = 400;
      throw exception;
    }

    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

    const targetIndex = db.data.findIndex(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );
    if (targetIndex < 0) {
      const exception = new Error("Pokemon Not Found");
      exception.statusCode = 404;
      throw exception;
    }

    if (updateKeys.includes("id")) {
      const existingIndex = db.data.findIndex(
        (pokemon) =>
          pokemon.id === parseInt(updates.id) &&
          parseInt(updates.id) !== parseInt(pokemonId)
      );
      if (existingIndex >= 0) {
        const exception = new Error("ID already exists on another pokemon");
        exception.statusCode = 400;
        throw exception;
      }
    }

    const updatedPokemon = {
      ...db.data[targetIndex],
      ...updates,
      id: parseInt(updates.id, 10) || db.data[targetIndex].id,
    };
    db.data[targetIndex] = updatedPokemon;

    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).send({ data: updatedPokemon });
  } catch (error) {
    next(error);
  }
};

module.exports = updatePokemon;
