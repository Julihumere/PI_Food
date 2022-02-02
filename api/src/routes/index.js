const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db");
const { getAll } = require("../Controllers/Controllers");

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  let Api = await getAll();

  if (name) {
    const nombre = Api.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    nombre.length
      ? res.status(200).json(nombre)
      : res.status(404).send("No existe una receta con el nombre solicitado");
  } else {
    res.send(Api);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  let Api = await getAll();
  const ID = Api.filter((e) => e.id == id);
  ID.length
    ? res.json(ID)
    : res.status(404).send("No existe ninguna receta con esa ID");
});

router.get("/types", async (req, res) => {
  const ApiRecipe = await getAll();
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
