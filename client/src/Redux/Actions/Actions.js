export const RECIPES = "RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_DETAIL = "GET_DETAIL_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_LETTER = "FILTER_BY_LETTER";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ERROR = "GET_ERROR";

export const getRecipes = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: RECIPES,
          payload: data,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export const getDiets = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/types")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: GET_DIETS,
          payload: data,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export const getRecipesByName = (name) => (dispatch) => {
  try {
    return fetch("http://localhost:3001/recipes?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        if (!data.msg) {
          dispatch({
            type: GET_RECIPES_BY_NAME,
            payload: data,
          });
        } else {
          dispatch({
            type: GET_ERROR,
            payload: data.msg,
          });
        }
      });
  } catch (e) {
    console.log(e);
  }
};

export const getDetail = (id) => (dispatch) => {
  try {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: GET_DETAIL,
          payload: data,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export const createRecipe = (payload) => (dispatch) => {
  try {
    return fetch("http://localhost:3001/recipe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      dispatch({
        type: CREATE_RECIPE,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const filterByDiets = (payload) => {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
};

export const filterByLetter = (payload) => {
  return {
    type: FILTER_BY_LETTER,
    payload,
  };
};

export const filterByScore = (payload) => {
  return {
    type: FILTER_BY_SCORE,
    payload,
  };
};
