const fs = require("fs");

const getPokemonById = (req, res, next) => {
  try {
    const { pokemonId } = req.params;
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const { data } = db;
    const targetIndex = data.findIndex(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );
    if (targetIndex < 0) {
      const exception = new Error("Pokemon Not Found");
      exception.statusCode = 404;
      throw exception;
    }

    const prevIndex = !targetIndex ? data.length - 1 : targetIndex - 1;
    const nextIndex = targetIndex === data.length - 1 ? 0 : targetIndex + 1;

    res.status(200).send({
      data: {
        pokemon: data[targetIndex],
        previousPokemon: data[prevIndex],
        nextPokemon: data[nextIndex],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPokemonById;
