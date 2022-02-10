import { Meal } from "../../models/meal";

export const SET_MEALS = 'SET_MEALS';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_FILTERED_MEALS = 'SET_FILTERED_MEALS';

export const setMeals = (meals: Meal[]) => {
  return { type: SET_MEALS, meals };
}

export const setFilteredMeals = (meals: Meal[]) => {
  return { type: SET_FILTERED_MEALS, meals };
}

export const setFilters = (filters: any) => {
  return { type: SET_FILTERS, filters };
}