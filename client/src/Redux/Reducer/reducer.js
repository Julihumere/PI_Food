import {
  RECIPES,
  FILTER_BY_DIETS,
  FILTER_BY_LETTER,
  FILTER_BY_SCORE,
  GET_RECIPES_BY_NAME,
  GET_DETAIL,
  GET_DIETS,
  CREATE_RECIPE,
  FILTER_BY_CREATION,
} from "../Actions/Actions";

const initialState = {
  menuComplete: [],
  recipes: [],
  diets: [],
  detail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECIPES:
      return {
        ...state,
        recipes: action.payload,
        menuComplete: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case FILTER_BY_DIETS:
      let recipesFilter =
        action.payload === "All"
          ? state.menuComplete
          : state.menuComplete.filter((e) => e.diets.includes(action.payload));
      return {
        ...state,
        recipes: recipesFilter,
      };
    case FILTER_BY_LETTER:
      const letterFilter =
        action.payload === "asc"
          ? state.menuComplete.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.menuComplete.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: letterFilter,
      };

    case FILTER_BY_SCORE:
      const scoreFilter =
        action.payload === "asc"
          ? state.menuComplete.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            })
          : state.menuComplete.sort((a, b) => {
              if (a.score > b.score) return -1;
              if (a.score < b.score) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: scoreFilter,
      };

    case CREATE_RECIPE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
