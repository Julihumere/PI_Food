const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getApi = async () => {
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

const getDb = async () => {
  let DB = await Recipe.findAll({
    include: {
      model: Diet,
    },
  });
  return DB;
};

const getAll = async () => {
  const allApi = await getApi();
  const allDb = await getDb();
  const total = allApi.concat(allDb);
  return total;
};

module.exports = {
  getAll,
  getApi,
};
