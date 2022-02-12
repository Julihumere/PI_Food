const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db");
const { getAll } = require("../Controllers/Controllers");

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  try {
    let Api = await getAll();
    if (name) {
      const filterByName = Api.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      filterByName.length
        ? res.status(200).json(filterByName)
        : res.status(404).send("Theres isn't recipe with that name");
    } else {
      res.send(Api);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let Api = await getAll();
    const ID = Api.filter((e) => e.id == id);
    ID.length > 0
      ? res.status(200).json(ID)
      : res.status(404).send("There isn't recipe with that ID");
  } catch (e) {
    console.log(e);
  }
});

router.get("/types", async (req, res) => {
  try {
    const ApiRecipe = await getAll();
    const ApiDiets = ApiRecipe.map((e) => e.diets)
      .join(",")
      .split(",");
    let filterDiets = ApiDiets.filter((item, index) => {
      return ApiDiets.indexOf(item) === index;
    });
    filterDiets.forEach((e) => {
      if (e !== "") {
        Diet.findOrCreate({
          where: {
            diet: e,
          },
        });
      }
    });
    Diet.findOrCreate({ where: { diet: "ketogenic" } });
    let AllDiets = await Diet.findAll();
    res.send(AllDiets);
  } catch (e) {
    console.log(e);
  }
});

router.post("/recipe", async (req, res) => {
  const {
    name,
    summary,
    img,
    score,
    healthScore,
    step,
    dishType,
    createInDb,
    diet,
  } = req.body;
  try {
    let recipeCreate = await Recipe.create({
      name,
      img,
      summary,
      score,
      healthScore,
      step,
      dishType,
      createInDb,
    });

    let recipeDiet = await Diet.findAll({
      where: { diet: diet },
    });
    recipeCreate.addDiet(recipeDiet);
    res.send("Create recipe");
  } catch (e) {
    console.log(e);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
