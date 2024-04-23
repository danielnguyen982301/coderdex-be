const fs = require("fs");

const getPokemons = (req, res, next) => {
  const allowedQuery = ["page", "limit", "search", "type"];
  try {
    let { page, limit, ...filterQuery } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    const filterKeys = Object.keys(filterQuery);
    filterKeys.forEach((key) => {
      if (!allowedQuery.includes(key)) {
        const exception = new Error("Invalid query");
        exception.statusCode = 400;
        throw exception;
      }
      if (!filterQuery[key]) delete filterQuery[key];
    });

    let db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    let result = db.data;

    if (filterKeys.length) {
      filterKeys.forEach((key) => {
        result =
          key === "type"
            ? result.filter((pokemon) =>
                pokemon.types.includes(filterQuery[key].trim())
              )
            : key === "search" && !isNaN(parseInt(filterQuery[key].trim()))
            ? result.filter((pokemon) => {
                const pokedexNum = `00${pokemon.id}`.slice(-3);
                return pokedexNum.includes(filterQuery[key].trim());
              })
            : result.filter((pokemon) =>
                pokemon.name.includes(filterQuery[key].trim().toLowerCase())
              );
      });
    }

    let offset = limit * (page - 1);
    result = result.slice(offset, offset + limit);

    res.status(200).send({ data: result, totalPokemons: db.totalPokemons });
  } catch (error) {
    next(error);
  }
};

module.exports = getPokemons;
