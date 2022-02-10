import { gql } from "@apollo/client";

export const GET_MEAL = gql`
  query Meal($id: String) {
    meal(id: $id) {
      id
      title
      affordability
      ingredients
      complexity
      imageUrl
      duration
      steps
    }
  }
`;