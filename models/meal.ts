export interface MealI {
  id: string;
  categoryIds: any;
  title: string;
  affordability: string;
  complexity: string;
  imageUrl: string; 
  duration: number;
  ingredients: string[];
  steps: any;
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
}

export class Meal implements MealI {
  id: string = '';
  categoryIds: any = '';
  title: string = '';
  affordability: string = '';
  complexity: string = '';
  imageUrl: string = ''; 
  duration: number = 0;
  ingredients: string[] = [];
  steps: any = '';
  isGlutenFree: boolean = false;
  isVegan: boolean = false;
  isVegetarian: boolean = false;
  isLactoseFree: boolean = false;

  constructor(
    id: string,
    categoryIds: any,
    title: string,
    affordability: string,
    complexity: string,
    imageUrl: string,
    duration: number,
    ingredients: string[],
    steps: any,
    isGlutenFree: boolean,
    isVegan: boolean,
    isVegetarian: boolean,
    isLactoseFree: boolean,
  ) {
    this.id = id; 
    this.categoryIds = categoryIds; 
    this.title = title; 
    this.affordability = affordability; 
    this.complexity = complexity; 
    this.imageUrl = imageUrl; 
    this.duration = duration; 
    this.ingredients = ingredients; 
    this.steps = steps; 
    this.isGlutenFree = isGlutenFree; 
    this.isVegan = isVegan; 
    this.isVegetarian = isVegetarian; 
    this.isLactoseFree = isLactoseFree; 
  }
}