import { MEALS } from "../../constants/dummy-data";
import { Meal } from "../../models/meal";
import { SET_FILTERS, TOGGLE_FAVORITE } from "./actions";
import { mealsState } from "./model";

const initialState: mealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
}

const mealsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex((meal: Meal) => meal?.id === action.id);
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal: Meal) => meal.id === action.id);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)}
      }
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

