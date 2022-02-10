import { Meal } from "../../models/meal";

export interface mealsState {
  meals: Meal[],
  filteredMeals: Meal[],
  favoriteMeals: []
}