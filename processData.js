const fs = require("fs");
const csv = require("csvtojson");

const processData = async () => {
  let newData = await csv().fromFile("pokemons-with-desc.csv");
  let extraData = await csv().fromFile("pokemon-with-category.csv");
  newData = newData.slice(0, 721);
  extraData = extraData.slice(0, 721);

  newData = newData.map((data, index) => {
    const heightInFoot = parseInt(data.height * 0.328);
    const heightInInches = Math.round(
      (data.height * 0.3280839895 - heightInFoot) * 12
    );
    const category = extraData[index].classfication;
    const types = [];
    if (data.type1 !== "None") {
      types.push(data.type1);
    }
    if (data.type2 !== "None") {
      types.push(data.type2);
    }

    return {
      id: parseInt(data.id),
      name: data.name,
      description: data.desc,
      height:
        heightInFoot + "'" + heightInInches.toString().padStart(2, 0) + "''",
      weight: Math.round(data.weight * 0.2204622622 * 10) / 10 + " lbs",
      category: category.substring(0, category.length - 8),
      abilities: data.abilities
        .substring(0, data.abilities.length - 1)
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(", "),
      types: types,
      url: `http://localhost:8000/images/${data.id}.png`,
    };
  });
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  db.data = newData;
  db.totalPokemons = newData.length;
  fs.writeFileSync("db.json", JSON.stringify(db));
};

processData();
