const fs = require("fs");

const deletePokemon = (req, res, next) => {
  try {
    const { pokemonId } = req.params;
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const deletedPokemon = db.data.find(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );
    if (!deletedPokemon) {
      const exception = new Error("Pokemon Not Found");
      exception.statusCode = 404;
      throw exception;
    }

    db.data = db.data.filter((pokemon) => pokemon.id !== parseInt(pokemonId));
    db.totalPokemons--;

    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).send({ data: deletedPokemon });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePokemon;
