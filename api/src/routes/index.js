const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Recipe, Diet, Op } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getApi = async (req, res) => {
  const Api = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const ApiInfo = await Api.data.results?.map((e) => {
    return {
      id: e.id,
      name: e.title,
      img: e.image,
      dishType: e.dishTypes.map((e) => e),
      diets: e.diets.map((e) => e),
      summary: e.summary,
      putuaction: e.spoonacularScore,
      healthScore: e.healthScore,
      step: e.analyzedInstructions.map((e) => e.steps),
    };
  });
  return ApiInfo;
};

const getDb = async (req, res) => {
  let DB = await Recipe.findAll({
    include: {
      model: Diet,
    },
  });
  return DB;
};

const getAll = async (req, res) => {
  const allApi = await getApi();
  const allDb = await getDb();
  const total = allApi.concat(allDb);
  console.log(total);
  return total;
};

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  let Api = await getAll();
  if (name) {
    const nombre = Api.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    nombre ? res.json(nombre) : "Morite";
  } else {
    res.send(Api);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  let Api = await getApi();
  const ID = Api.filter((e) => e.id === parseInt(id));
  ID ? res.json(ID) : "No existe dicha receta";
});

router.get("/types", async (req, res) => {
  const ApiRecipe = await getApi();
  const ApiDiets = ApiRecipe.map((e) => e.diets)
    .join(",")
    .split(",");

  let tipazo = ApiDiets.filter((item, index) => {
    return ApiDiets.indexOf(item) === index;
  });
  tipazo.forEach((e) => {
    if (e !== "") {
      Diet.findOrCreate({
        where: {
          diet: e,
        },
      });
    }
  });
  Diet.findOrCreate({ where: { diet: "Ketogenic" } });
  let AllDiets = await Diet.findAll();
  res.send(AllDiets);
});

router.post("/recipe", async (req, res) => {
  let { recipe, diet } = req.body;
  let recipeCreate = await Recipe.create(recipe);

  let dietDb = await Diet.findAll({ where: { diet: diet } });
  recipeCreate.addDiet(dietDb);

  res.send("ALTA COMIDA");
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
