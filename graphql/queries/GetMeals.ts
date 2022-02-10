import { gql } from "@apollo/client";

export const GET_MEALS = gql`
  query Meals {
    meals {
      id
      categoryIds
      title
      affordability
      complexity
      imageUrl
      duration
    }
  }
`;