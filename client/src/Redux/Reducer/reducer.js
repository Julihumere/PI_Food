import {
  RECIPES,
  FILTER_BY_DIETS,
  FILTER_BY_LETTER,
  FILTER_BY_SCORE,
  GET_RECIPES_BY_NAME,
  GET_DETAIL,
  GET_DIETS,
  CREATE_RECIPE,
  GET_ERROR,
} from "../Actions/Actions";

const initialState = {
  menuComplete: [],
  recipes: [],
  diets: [],
  detail: [],
  error: "",
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
    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        recipes: [],
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case FILTER_BY_DIETS:
      let diets = [...state.menuComplete];
      let recipesFilter =
        action.payload === "All"
          ? state.menuComplete
          : diets.filter((e) => e.diets.includes(action.payload));
      return {
        ...state,
        recipes: recipesFilter,
      };
    case FILTER_BY_LETTER:
      let letter = [...state.recipes];
      let letterFilter =
        action.payload === "asc"
          ? letter.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : letter.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: letterFilter,
      };

    case FILTER_BY_SCORE:
      let score = [...state.recipes];
      let scoreFilter =
        action.payload === "asc"
          ? score.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            })
          : score.sort((a, b) => {
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
