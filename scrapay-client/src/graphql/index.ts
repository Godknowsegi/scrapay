import { gql } from "@apollo/client";

export const All_BOOKS = gql`
  query books {
    books {
      description
      id
      name
    }
  }
`;
