import { Meal } from "../../models/meal";
import { SET_FILTERED_MEALS, SET_FILTERS, SET_MEALS } from "./actions";
import { mealsState } from "./model";

const initialState: mealsState = {
  meals: [],
  filteredMeals: []
}

const mealsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_MEALS:
      return { ...state, meals: action.meals};
      break;
    case SET_FILTERED_MEALS:
      return { ...state, filteredMeals: action.meals};
      break;
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal: Meal) => {
        if(appliedFilters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if(appliedFilters.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if(appliedFilters.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        if(appliedFilters.isVegan && !meal.isVegan) {
          return false;
        }
        return true;
      })
      return { ...state, filteredMeals };
      break;
    default:
      return state;
  }
  return state;
}

export {mealsReducer, mealsState};

