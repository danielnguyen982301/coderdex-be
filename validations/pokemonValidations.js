const { body } = require("express-validator");
const pokemonTypes = require("../pokemonTypes");

exports.createPokemonValidations = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .custom((value) => !isNaN(parseInt(value)))
    .withMessage("ID must be a number")
    .trim()
    .escape(),
  body("name").notEmpty().trim().escape().withMessage("Name is required"),
  body("types")
    .isArray({ min: 1 })
    .withMessage("Type is required")
    .isArray({ max: 2 })
    .withMessage("Pokemon can only have at most 2 types")
    .custom((value) => {
      value.forEach((type) => {
        if (!pokemonTypes.includes(type)) {
          throw new Error("Invalid Pokemon's Type");
        }
      });
      return true;
    }),
  body("url").notEmpty().trim().withMessage("Image URL is required"),
  body("description").trim().escape().optional(),
  body("height").trim().escape().optional(),
  body("weight").trim().escape().optional(),
  body("category").trim().escape().optional(),
  body("abilities").trim().escape().optional(),
];

exports.updatePokemonValidations = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .custom((value) => !isNaN(parseInt(value)))
    .withMessage("ID must be a number")
    .trim()
    .escape()
    .optional(),
  body("name")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Name is required")
    .optional(),
  body("types")
    .isArray({ min: 1 })
    .withMessage("Type is required")
    .isArray({ max: 2 })
    .withMessage("Pokemon can only have at most 2 types")
    .custom((value) => {
      value.forEach((type) => {
        if (!pokemonTypes.includes(type)) {
          throw new Error("Invalid Pokemon's Type");
        }
      });
      return true;
    })
    .optional(),
  body("url").notEmpty().trim().withMessage("Image URL is required").optional(),
  body("description").trim().escape().optional(),
  body("height").trim().escape().optional(),
  body("weight").trim().escape().optional(),
  body("category").trim().escape().optional(),
  body("abilities").trim().escape().optional(),
];
