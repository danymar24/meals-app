import { gql } from "@apollo/client";

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: String) {
    toggleFavorite(id: $id)
  }
`;