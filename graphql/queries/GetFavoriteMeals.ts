import { gql } from "@apollo/client";

export const GET_FAVORITE_MEALS = gql`
  query FavoriteMeals {
    favoriteMeals {
      id
      categoryIds
      title
      affordability
      complexity
      imageUrl
      duration
    }
  }
`